const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3002',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});


// ContestEntry Schema and Model
const ContestEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const ContestEntry = mongoose.model('ContestEntry', ContestEntrySchema);

// Route to handle contest entry submission
app.post('/api/contest', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file.path;
    const newEntry = new ContestEntry({ name, image, description });
    await newEntry.save();

    res.status(201).json({ message: 'Contest entry saved successfully', entry: newEntry });
  } catch (error) {
    console.error('Error saving contest entry:', error);
    res.status(500).json({ error: 'Failed to save contest entry' });
  }
});
