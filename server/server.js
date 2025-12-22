const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('./config/cloudinary');
const fileRoutes = require('./routes/file'); 
// 1. Initialize App & Environment
dotenv.config();
const app = express();

// 2. Middlewares
app.use(cors()); 
app.use(express.json()); // Allows parsing of JSON bodies
app.use(express.urlencoded({ extended: true }));

// 3. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 4. Routes
// This tells Express to use your file logic for any URL starting with /api/files
app.use('/api/files', fileRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('File Sharing API is running...');
});

// 5. Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});