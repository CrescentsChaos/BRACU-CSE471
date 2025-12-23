const express = require('express');
const router = express.Router();
const Course = require('../models/Courses');
router.get('/filters', async (req, res) => {
    try {
        const categories = await Course.distinct('category');
        const publishers = await Course.distinct('publisher');
        res.json({ categories, publishers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/search', async (req, res) => {
    try {
        const { name, category, publisher, minRating } = req.query;
        let query = {};

        if (name) query.name = { $regex: name, $options: 'i' };
        if (category && category !== "") query.category = category;
        if (publisher && publisher !== "") query.publisher = publisher;
        
        // Rating filter: find courses with rating greater than or equal to minRating
        if (minRating) {
            query.rating = { $gte: parseFloat(minRating) };
        }

        const results = await Course.find(query).sort({ rating: -1 });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;