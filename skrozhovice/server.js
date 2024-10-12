const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: './code.env' });

const app = express();
app.use(cors());
app.use(express.json());

const FIXED_USERNAME = process.env.ADMIN_USERNAME;
const FIXED_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// Připravte hash hesla při spuštění serveru, pokud ještě nebyl hashe
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

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Porovnejte uživatelské jméno a heslo
  if (username === FIXED_USERNAME) {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    }
  }

  return res.status(401).json({ message: 'Invalid username or password' });
});

app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ message: 'Access granted', user: decoded.username });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
});

// Modely pro MongoDB
const aktualitaSchema = new mongoose.Schema({
  date: Date,
  headline: String,
  image: String,
  text: String,
  category: String,
  lineup: String
}, { collection: 'Aktuality' });

const matchSchema = new mongoose.Schema({
  round: Number,
  date: Date,
  kickoffTime: String,
  teamDomaci: String,
  teamHoste: String,
  score: String,     
}, { collection: 'Matches' });

const playerSchema = new mongoose.Schema({
  name: String,
  birthyear: Number,
  height: Number,
  weight: Number,
  clubyear: Number,
  beercount: Number,
}, { collection: 'Players' });

const Aktualita = mongoose.model('Aktualita', aktualitaSchema);
const Match = mongoose.model('Match', matchSchema);
const Player = mongoose.model('Player', playerSchema);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Endpointy pro API
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
