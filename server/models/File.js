const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  format: String,
  size: Number,
  createdAt: { type: Date, default: Date.now }
});

// MAKE SURE THIS IS EXACTLY LIKE THIS:
module.exports = mongoose.model('File', fileSchema);