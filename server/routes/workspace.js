const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/add-task', async (req, res) => {
    const { taskName, description } = req.body;

    // Log the IDs to verify the server is seeing your .env variables
    console.log("Attempting to post to List ID:", process.env.TRELLO_LIST_ID);

    try {
        const response = await axios.post(`https://api.trello.com/1/cards`, null, {
            params: {
                idList: process.env.TRELLO_LIST_ID, // Must be the 24-char ID
                key: process.env.TRELLO_KEY,
                token: process.env.TRELLO_TOKEN,
                name: taskName,
                desc: description
            }
        });
        res.status(200).json(response.data);
    } catch (err) {
        // This will print the exact error (like "invalid idList") in your terminal
        console.error("Trello Error:", err.response?.data || err.message);
        res.status(500).json({ error: err.response?.data || "Internal Server Error" });
    }
});

module.exports = router;