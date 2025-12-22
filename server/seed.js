const mongoose = require('mongoose');
const File = require('./models/File'); 
require('dotenv').config();

const dummyCourses = [
  {
    name: "Complete React Developer 2025",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "pdf",
    size: 5242880, // 5MB
    category: "Web Development"
  },
  {
    name: "Advanced Python Data Science",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "pdf",
    size: 8388608, // 8MB
    category: "Data Science"
  },
  {
    name: "UI/UX Design Masterclass",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "jpg",
    size: 2097152, // 2MB
    category: "Design"
  },
  {
    name: "Node.js Backend Architecture",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "pdf",
    size: 3145728, // 3MB
    category: "Web Development"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");
    

    await File.insertMany(dummyCourses);
    console.log("Successfully added dummy courses!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();