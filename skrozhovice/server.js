const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config({ path: './code.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files for uploaded images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const FIXED_USERNAME = process.env.ADMIN_USERNAME;
const FIXED_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'public/images');
    // Create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name conflicts
  },
});
const upload = multer({ storage });

// Prepare hashed password when the server starts, if not already hashed
let hashedPassword;
bcrypt.hash(FIXED_PASSWORD, 10).then(hash => {
  hashedPassword = hash;
}).catch(err => console.error('Error hashing password', err));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.error('Error connecting to MongoDB', err));

// Token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = decoded; // Store the user info in the request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Check username and password
  if (username === FIXED_USERNAME) {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    }
  }

  return res.status(401).json({ message: 'Invalid username or password' });
});

// Image upload route
app.post('/api/upload', upload.single('image'), (req, res) => {
  // Assuming the file was uploaded successfully
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Return the URL of the uploaded image
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  res.json({ imageUrl });
});

// MongoDB models
const aktualitaSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  headline: { type: String, required: true },
  image: { type: String, required: false },
  text: { type: String, required: true },
  category: { type: String, required: true },
  lineup: { type: String, required: false },
}, { collection: 'Aktuality' });

const matchSchema = new mongoose.Schema({
  round: { type: String, required: true },
    date: { type: Date, required: false }, 
    kickoffTime: { type: String, required: false },
    teamDomaci: { type: String, required: true },
    teamHoste: { type: String, required: true },
    score: { type: String, required: false }, 
}, { collection: 'Matches' });

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthyear: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  clubyear: { type: Number, required: true },
  beercount: { type: Number, required: true },
}, { collection: 'Players' });

const Aktualita = mongoose.model('Aktualita', aktualitaSchema);
const Match = mongoose.model('Match', matchSchema);
const Player = mongoose.model('Player', playerSchema);

// API endpoints
app.get('/api/aktuality/main', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'MongoDB not connected' });
  }

  try {
    const aktuality = await Aktualita.find().sort({ date: -1 }).limit(3);
    res.json(aktuality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all aktuality with pagination
app.get('/api/aktuality/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Aktualita.countDocuments();
    const aktuality = await Aktualita.find().sort({ date: -1 }).skip(skip).limit(limit);

    res.json({ aktuality, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all matches
app.get('/api/matches', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'MongoDB not connected' });
  }

  try {
    const matches = await Match.find().sort({ date: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get player by name
app.get('/api/player/:name', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'MongoDB not connected' });
  }

  try {
    const player = await Player.findOne({ name: req.params.name });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected routes for adding, editing, or deleting aktuality
app.post('/api/aktuality/add', verifyToken, async (req, res) => {
  try {
    const newAktualita = new Aktualita(req.body);
    await newAktualita.save();
    res.status(201).json(newAktualita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit aktualita by ID
app.put('/api/aktuality/edit/:id', verifyToken, async (req, res) => {
  try {
    const updatedAktualita = await Aktualita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }
    res.json(updatedAktualita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete aktualita by ID
app.delete('/api/aktuality/delete/:id', verifyToken, async (req, res) => {
  try {
    const deletedAktualita = await Aktualita.findByIdAndDelete(req.params.id);
    if (!deletedAktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }
    res.json({ message: 'Aktualita deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post('/api/matches', verifyToken, async (req, res) => {
  const newMatch = new Match(req.body);
  try {
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put('/api/matches/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
      const updatedMatch = await Match.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedMatch) {
          return res.status(404).json({ message: 'Match not found' });
      }
      res.json(updatedMatch);
  } catch (error) {
      res.status(400).json({ message: 'Error updating match', error });
  }
});


app.get('/api/matches/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/matches/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMatch = await Match.findByIdAndDelete(id);
    if (!deletedMatch) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json({ message: 'Match deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/matches', verifyToken, async (req, res) => {
  const { homeTeam, awayTeam, date, score } = req.body;

  try {
    const newMatch = new Match({ homeTeam, awayTeam, date, score });
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    console.error('Error adding match:', error);
    res.status(500).json({ message: error.message });
  }
});