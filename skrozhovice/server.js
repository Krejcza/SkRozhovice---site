const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
require('dotenv').config({ path: './code.env' });

const app = express();
app.use(cors());
app.use(express.json());


// Environment Variables and Constants
const requiredEnvVars = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'JWT_SECRET', 'MONGODB_URI'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
}
const FIXED_USERNAME = process.env.ADMIN_USERNAME;
const FIXED_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB Setup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('Error connecting to MongoDB', err));

// Middleware for checking MongoDB connection
const checkMongoDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'MongoDB not connected' });
  }
  next();
};




app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  // Add headers to help with debugging
  setHeaders: (res, path) => {
    res.set('X-Content-Type-Options', 'nosniff');
    // Log when files are requested
    console.log('Static file requested:', path);
  }
}));

// Add a test endpoint to check if the server can access the files
app.get('/test-image/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});


const uploadDir = path.join(__dirname, 'uploads');
const defaultImagePath = path.join(uploadDir, 'default.webp');

const initializeUploads = async () => {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Upload directory created at:', uploadDir);
    }

    if (!fs.existsSync(defaultImagePath)) {
      const sourceDefaultImage = path.join(__dirname, 'assets', 'default.webp');
      fs.copyFileSync(sourceDefaultImage, defaultImagePath);
      console.log('Default image copied to uploads directory');
    }
  } catch (err) {
    console.error('Error in initialization:', err);
  }
};

// Initialize uploads directory and default image
initializeUploads();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Saving file to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('Received file:', file.originalname, 'Type:', file.mimetype);
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
}).single('image');


app.post('/api/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({
        message: 'File upload error',
        error: err.message
      });
    } else if (err) {
      console.error('Unknown upload error:', err);
      return res.status(500).json({
        message: 'Unknown upload error',
        error: err.message
      });
    }

    // If no file is uploaded, return default image path
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded, using default image',
        imagePath: '/uploads/default.webp'
      });
    }

    console.log('File successfully uploaded:', req.file);
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({
      message: 'File uploaded successfully',
      imagePath: imagePath
    });
  });
});


// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

let hashedPassword;
bcrypt.hash(FIXED_PASSWORD, 10)
  .then(hash => (hashedPassword = hash))
  .catch(err => console.error('Error hashing password', err));

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === FIXED_USERNAME && await bcrypt.compare(password, hashedPassword)) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid username or password' });
});

const aktualitaSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  text: { type: String, required: true },     
  image: { type: String, default: "" },                    
  category: { type: String, required: true },                  
  lineup: { type: String, default: "" },                 
  date: { type: Date, required: true }, 
}, {
  collection: 'Aktuality',
  versionKey: false
});

const matchSchema = new mongoose.Schema({
  round: { type: String, required: true },
  date: { type: Date },
  kickoffTime: { type: String },
  teamDomaci: { type: String, required: true },
  teamHoste: { type: String, required: true },
  score: { type: String },
}, { collection: 'Matches' });

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthyear: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  clubyear: { type: Number, required: true },
  beercount: { type: Number, required: true },
  instagram: {type: String, required: false},
  imagePath: {type: String, default: 'onePlayer'} 
}, { collection: 'Players' });

const Aktualita = mongoose.model('Aktualita', aktualitaSchema);
const Match = mongoose.model('Match', matchSchema);
const Player = mongoose.model('Player', playerSchema);

// Aktuality Routes
app.get('/api/aktuality/main', checkMongoDBConnection, async (req, res) => {
  try {
    const aktuality = await Aktualita.find().sort({ date: -1 }).limit(3);
    res.json(aktuality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/aktuality/all', checkMongoDBConnection, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const total = await Aktualita.countDocuments();
    const aktuality = await Aktualita.find().sort({ date: -1 }).skip(skip).limit(limit);
    res.json({ aktuality, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/aktuality', verifyToken, async (req, res) => {
  const { date,headline, image, text, category, lineup } = req.body;

  const newAktualita = new Aktualita({
    date,
    headline,
    image,
    text,
    category,
    lineup,
  });


  try {
    const savedAktualita = await newAktualita.save();
    res.status(201).json(savedAktualita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put('/api/aktuality/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { date, headline, image, text, category, lineup } = req.body;

  try {
    const updatedAktualita = await Aktualita.findByIdAndUpdate(
      id,
      { date, headline, image, text, category, lineup },
      { new: true, runValidators: true }
    );

    if (!updatedAktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }

    res.json(updatedAktualita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating aktualita' });
  }
});


app.delete('/api/aktuality/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAktualita = await Aktualita.findByIdAndDelete(id);
    if (!deletedAktualita) {
      return res.status(404).send({ message: 'Aktualita not found' });
    }
    res.status(204).send(); // No Content on successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting aktualita' });
  }
});








// Routes for Matches
app.get('/api/matches', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(500).json({ message: 'MongoDB not connected' });
  try {
    const matches = await Match.find().sort({ date: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/matches/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/matches/:id', verifyToken, async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMatch) return res.status(404).json({ message: 'Match not found' });
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: 'Error updating match' });
  }
});

app.delete('/api/matches/:id', verifyToken, async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);
    if (!deletedMatch) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Match deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/matches', verifyToken, async (req, res) => {
  try {
    const newMatch = new Match(req.body);
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};




app.get('/api/players', async (req, res) => {
  try {
    const players = await Player.find().sort({ name: 1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/players/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    console.error('Error fetching player details:', error);
    res.status(500).json({ message: 'Error fetching player details' });
  }
});

app.get('/api/players/name/:name', async (req, res) => {
  try {
    const decodedName = decodeURIComponent(req.params.name);
    console.log('Searching for player:', decodedName);
    
    const escapedName = escapeRegExp(decodedName);
    const nameRegex = new RegExp(`^${escapedName}$`, 'i');
    
    const player = await Player.findOne({ name: nameRegex });
    
    if (!player) {
      console.log('Player not found:', decodedName);
      return res.status(404).json({ 
        message: 'Player not found',
        searchedName: decodedName 
      });
    }
    
    console.log('Found player:', player);
    res.json(player);
  } catch (error) {
    console.error('Error fetching player by name:', error);
    res.status(500).json({ 
      message: 'Error fetching player details',
      error: error.message 
    });
  }
});

app.put('/api/players/:id', async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlayer) return res.status(404).json({ message: 'Player not found' });
    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.delete('/api/players/:id', async (req, res) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) return res.status(404).json({ message: 'Player not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

