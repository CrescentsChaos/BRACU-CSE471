const cloudinary = require('cloudinary').v2;
CLOUDINARY_CLOUD_NAME='ddktsgcrq'
CLOUDINARY_API_KEY='199737633127415'
CLOUDINARY_API_SECRET='mIugVg14AcbQG-0jQEwgdjXsfk8'
// ADD THIS LOG
console.log("Cloudinary Config Check:", {
  name: CLOUDINARY_CLOUD_NAME ? "Loaded ✅" : "MISSING ❌",
  key: CLOUDINARY_API_KEY ? "Loaded ✅" : "MISSING ❌"
});
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

module.exports = cloudinary;