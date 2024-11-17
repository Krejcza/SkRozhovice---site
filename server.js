const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const requestIp = require('request-ip');
require('dotenv').config({ path: './code.env' });


const uploader = multer({ storage: multer.memoryStorage() }).single('image');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Environment Variables and Constants
const requiredEnvVars = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'JWT_SECRET', 'MONGODB_URI', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', "CLOUDINARY_UPLOAD_PRESET"];
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
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('Error connecting to MongoDB', err));

// Middleware for checking MongoDB connection
const checkMongoDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'MongoDB not connected' });
  }
  next();
};

// Cloudinary Setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.post('/api/get-upload-url', (req, res) => {
  try {
    // Získání timestamp pro nahrání
    const timestamp = Math.floor(Date.now() / 1000);

    // Odeslání odpovědi s URL pro unsigned upload
    res.json({
      url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      timestamp: timestamp,
    });
  } catch (err) {
    console.error("Error generating Cloudinary upload URL:", err);  // Logování chyb
    res.status(500).json({ message: 'Error generating Cloudinary upload URL', error: err.message });
  }
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
  dislikeCount: { type: Number, default: 0 }, 
  likeCount: { type: Number, default: 0 },
  votes: {
    type: Object,
    default: {}
  }
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

// GET endpoint pro získání aktuality podle ID
app.get('/api/aktualita/:id', async (req, res) => {
  const { id } = req.params; // Získání ID z URL parametrů
  
  try {
    // Hledání aktuality podle ID v databázi
    const aktualita = await Aktualita.findById(id);
    
    // Pokud aktualita neexistuje, vrátí 404
    if (!aktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }

    // Vrátí nalezenou aktualitu jako JSON odpověď
    res.json(aktualita);
  } catch (error) {
    console.error(error);
    // Vrátí chybu 500 při neúspěchu
    res.status(500).json({ message: 'Error retrieving aktualita' });
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








app.post('/api/aktualita/:id/like', async (req, res) => {
  const { id } = req.params;
  const clientIp = requestIp.getClientIp(req);

  try {
    const aktualita = await Aktualita.findById(id);
    if (!aktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }

    // Inicializace votes pokud neexistuje
    if (!aktualita.votes) {
      aktualita.votes = {};
    }

    const currentVote = aktualita.votes[clientIp];
    
    // Pokud uživatel už dal like
    if (currentVote === 'liked') {
      return res.status(400).json({ 
        message: 'Already liked',
        likeCount: aktualita.likeCount,
        dislikeCount: aktualita.dislikeCount
      });
    }

    // Pokud měl dislike, odstraníme ho
    if (currentVote === 'disliked') {
      aktualita.dislikeCount = Math.max(0, aktualita.dislikeCount - 1);
    }

    aktualita.likeCount += 1;
    aktualita.votes[clientIp] = 'liked';

    // Použití markModified pro informování Mongoose o změně v objektu
    aktualita.markModified('votes');
    await aktualita.save();

    res.json({
      message: 'Article liked',
      likeCount: aktualita.likeCount,
      dislikeCount: aktualita.dislikeCount
    });
  } catch (error) {
    console.error('Error liking:', error);
    res.status(500).json({ 
      message: 'Server error',
      details: error.message 
    });
  }
});






app.post('/api/aktualita/:id/dislike', async (req, res) => {
  const { id } = req.params;
  const clientIp = requestIp.getClientIp(req);

  try {
    const aktualita = await Aktualita.findById(id);
    if (!aktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }

    // Inicializace votes pokud neexistuje
    if (!aktualita.votes) {
      aktualita.votes = {};
    }

    const currentVote = aktualita.votes[clientIp];
    
    // Pokud uživatel už dal dislike
    if (currentVote === 'disliked') {
      return res.status(400).json({ 
        message: 'Already disliked',
        likeCount: aktualita.likeCount,
        dislikeCount: aktualita.dislikeCount
      });
    }

    // Pokud měl like, odstraníme ho
    if (currentVote === 'liked') {
      aktualita.likeCount = Math.max(0, aktualita.likeCount - 1);
    }

    aktualita.dislikeCount += 1;
    aktualita.votes[clientIp] = 'disliked';

    aktualita.markModified('votes');
    await aktualita.save();

    res.json({
      message: 'Article disliked',
      likeCount: aktualita.likeCount,
      dislikeCount: aktualita.dislikeCount
    });
  } catch (error) {
    console.error('Error disliking:', error);
    res.status(500).json({ 
      message: 'Server error',
      details: error.message 
    });
  }
});









app.post('/api/aktualita/:id/unlike', async (req, res) => {
  const { id } = req.params;
  const clientIp = requestIp.getClientIp(req);

  try {
    const aktualita = await Aktualita.findById(id);
    if (!aktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }

    // Inicializace votes pokud neexistuje
    if (!aktualita.votes) {
      aktualita.votes = {};
    }

    const currentVote = aktualita.votes[clientIp];
    
    // Pokud uživatel neměl like, nemůžeme ho odebrat
    if (currentVote !== 'liked') {
      return res.status(400).json({ 
        message: 'No like to remove',
        likeCount: aktualita.likeCount,
        dislikeCount: aktualita.dislikeCount
      });
    }

    aktualita.likeCount = Math.max(0, aktualita.likeCount - 1);
    delete aktualita.votes[clientIp];

    aktualita.markModified('votes');
    await aktualita.save();

    res.json({
      message: 'Like removed',
      likeCount: aktualita.likeCount,
      dislikeCount: aktualita.dislikeCount
    });
  } catch (error) {
    console.error('Error unliking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});









app.post('/api/aktualita/:id/undislike', async (req, res) => {
  const { id } = req.params;
  const clientIp = requestIp.getClientIp(req);

  try {
    const aktualita = await Aktualita.findById(id);
    if (!aktualita) {
      return res.status(404).json({ message: 'Aktualita not found' });
    }

    // Inicializace votes pokud neexistuje
    if (!aktualita.votes) {
      aktualita.votes = {};
    }

    const currentVote = aktualita.votes[clientIp];
    
    // Pokud uživatel neměl dislike, nemůžeme ho odebrat
    if (currentVote !== 'disliked') {
      return res.status(400).json({ 
        message: 'No dislike to remove',
        likeCount: aktualita.likeCount,
        dislikeCount: aktualita.dislikeCount
      });
    }

    aktualita.dislikeCount = Math.max(0, aktualita.dislikeCount - 1);
    delete aktualita.votes[clientIp];

    aktualita.markModified('votes');
    await aktualita.save();

    res.json({
      message: 'Dislike removed',
      likeCount: aktualita.likeCount,
      dislikeCount: aktualita.dislikeCount
    });
  } catch (error) {
    console.error('Error undisliking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});









app.get('/api/aktualita/:id/status', async (req, res) => {
  const { id } = req.params;
  const clientIp = requestIp.getClientIp(req);

  try {
    console.log('Fetching status for id:', id);
    console.log('Client IP:', clientIp);

    const aktualita = await Aktualita.findById(id);
    if (!aktualita) {
      console.log('Aktualita not found');
      return res.status(404).json({ message: 'Aktualita not found' });
    }

    // Inicializace votes pokud neexistuje
    if (!aktualita.votes) {
      aktualita.votes = {};
      aktualita.markModified('votes');
      await aktualita.save();
    }

    console.log('Found aktualita:', {
      id: aktualita._id,
      likeCount: aktualita.likeCount,
      dislikeCount: aktualita.dislikeCount,
      votes: aktualita.votes
    });

    const userStatus = aktualita.votes[clientIp] || null;

    console.log('User status:', userStatus);

    res.json({
      likeCount: aktualita.likeCount || 0,
      dislikeCount: aktualita.dislikeCount || 0,
      userStatus
    });
  } catch (error) {
    console.error('Detailed error in status endpoint:', {
      error: error.message,
      stack: error.stack,
      id,
      clientIp
    });
    res.status(500).json({ 
      message: 'Server error', 
      details: error.message 
    });
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

