const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  format: String,
  size: Number,
  category: String,
  rating: { type: Number, default: 0 },
  publisher: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Courses', courseSchema);