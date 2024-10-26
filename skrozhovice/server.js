const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
    console.log('Connected to MongoDB');
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
  headline: { type: String},
  text: { type: String},     
  image: { type: String },                    
  category: { type: String },                  
  lineup: { type: String },                 
  date: { type: Date, default: Date.now }, 
}, { collection: 'Aktuality' });

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
  const { headline, text, category, lineup } = req.body;

  const newAktualita = new Aktualita({ 
    headline, 
    text, 
    category, 
    lineup 
  });

  try {
    const savedAktualita = await newAktualita.save();
    res.status(201).json(savedAktualita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/aktuality/:id', verifyToken, async (req, res) => {
  const { headline, text, category, lineup } = req.body;

  try {
    const updatedAktualita = await Aktualita.findByIdAndUpdate(
      req.params.id,
      { headline, text, category, lineup },
      { new: true }
    );

    if (!updatedAktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }

    res.json(updatedAktualita);
  } catch (error) {
    res.status(500).json({ message: error.message });
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







app.get('/api/player/:name', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(500).json({ message: 'MongoDB not connected' });
  try {
    const player = await Player.findOne({ name: req.params.name });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
