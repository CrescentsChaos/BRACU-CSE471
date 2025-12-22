const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('./config/cloudinary');
const fileRoutes = require('./routes/file'); 
//Initialize App & Environment
dotenv.config();
const app = express();

//Middlewares
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

//outes
app.use('/api/files', fileRoutes);

app.get('/', (req, res) => {
  res.send('File Sharing API is running...');
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});