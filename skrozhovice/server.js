const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/SKRozhoviceDB', {
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.error('Error connecting to MongoDB', err));

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








