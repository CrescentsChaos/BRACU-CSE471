const mongoose = require('mongoose');
const File = require('./models/Courses'); 
//mongodb://127.0.0.1:27017/skillswap
const dummyCourses = [
  {
    name: "Complete React Developer 2025",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "pdf",
    size: 5242880,
    category: "Web Development",
    rating: 4.8,
    publisher: "CodeMasters Academy"
  },
  {
    name: "Advanced Python for Data Science",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "pdf",
    size: 8388608,
    category: "Data Science",
    rating: 4.5,
    publisher: "TechUniversity"
  },
  {
    name: "Modern UI/UX Design Essentials",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "jpg",
    size: 2097152,
    category: "Design",
    rating: 4.9,
    publisher: "CreativeFlow"
  },
  {
    name: "Full-Stack Node.js Mastery",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "pdf",
    size: 3145728,
    category: "Web Development",
    rating: 4.2,
    publisher: "Backend Experts"
  },
  {
    name: "Digital Marketing Strategy 101",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "pdf",
    size: 1048576,
    category: "Marketing",
    rating: 4.0,
    publisher: "GrowthLabs"
  },
  {
    name: "Machine Learning with TensorFlow",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    format: "pdf",
    size: 15728640,
    category: "Data Science",
    rating: 4.7,
    publisher: "AI Frontiers"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://crescent:crescent11@skillswap.j8t3fyj.mongodb.net/?appName=skillswap');
    console.log("Connected to MongoDB...");

    await File.insertMany(dummyCourses);
    
    console.log("Dummy courses added successfully!");
    mongoose.connection.close(); 
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();