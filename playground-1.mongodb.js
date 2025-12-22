/* global use, db */
// MongoDB Playground for File Sharing App

// 1. Select the database for your project
use('fileSharingDB');

// 2. Clear existing data to start fresh (optional)
db.getCollection('files').drop();

// 3. Insert sample documents into the 'files' collection
// This matches the schema we discussed earlier.
db.getCollection('files').insertMany([
  {
    'name': 'vacation_photo.jpg',
    'url': 'https://res.cloudinary.com/demo/image/upload/v123/sample.jpg',
    'public_id': 'sample_id_1',
    'format': 'jpg',
    'size': 1024500, // bytes
    'createdAt': new Date()
  },
  {
    'name': 'project_specs.pdf',
    'url': 'https://res.cloudinary.com/demo/raw/upload/v456/specs.pdf',
    'public_id': 'sample_id_2',
    'format': 'pdf',
    'size': 5000000,
    'createdAt': new Date('2023-11-01T10:00:00Z')
  },
  {
    'name': 'resume_v2.pdf',
    'url': 'https://res.cloudinary.com/demo/raw/upload/v789/resume.pdf',
    'public_id': 'sample_id_3',
    'format': 'pdf',
    'size': 250000,
    'createdAt': new Date('2023-12-20T15:30:00Z')
  }
]);

// 4. Query: Count how many PDFs are stored
const pdfCount = db.getCollection('files').find({ format: 'pdf' }).count();
console.log(`Total PDFs stored: ${pdfCount}`);

// 5. Query: Find files larger than 1MB (1,000,000 bytes)
const largeFiles = db.getCollection('files').find({
  size: { $gt: 1000000 }
}).toArray();

console.log('Large files detected:', largeFiles);

// 6. Aggregation: Group files by format and sum total storage used
db.getCollection('files').aggregate([
  {
    $group: {
      _id: '$format',
      totalFiles: { $sum: 1 },
      totalStorage: { $sum: '$size' }
    }
  },
  {
    $project: {
      format: '$_id',
      totalFiles: 1,
      totalStorageMB: { $divide: ['$totalStorage', 1048576] } // Convert bytes to MB
    }
  }
]);