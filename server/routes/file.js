const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const FileModel = require('../models/File'); 

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('myFile'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'auto';

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: resourceType,
      folder: 'my_file_sharing_app'
    });

    const newFile = new FileModel({
      name: req.file.originalname,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format || 'pdf',
      size: result.bytes
    });

    await newFile.save();
    
    if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;