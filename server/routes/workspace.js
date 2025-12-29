const express = require('express');
const router = express.Router();
const axios = require('axios');

const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const BOARD_ID = process.env.TRELLO_BOARD_ID; 

router.get('/tasks', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/boards/${BOARD_ID}/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&attachments=true`
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "External Workspace API Error" });
    }
});

router.post('/add-task', async (req, res) => {
    const { taskName, description, fileUrl } = req.body;
    try {
        const response = await axios.post(
            `https://api.trello.com/1/cards?idList=${process.env.TRELLO_LIST_ID}&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`,
            {
                name: taskName,
                desc: description,
                urlSource: fileUrl
            }
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;