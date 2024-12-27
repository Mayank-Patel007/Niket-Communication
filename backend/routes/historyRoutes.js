const express = require('express');
const multer = require('multer');
const path = require('path');
const History = require('../models/History');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Create a new history record
router.post('/addhistory', upload.single('image'), async (req, res) => {
    try {
        const { year, title, para, description } = req.body;
        const history = new History({
            year,
            title,
            para,
            description: JSON.parse(description),
            image: req.file ? req.file.filename : '',
        });
        await history.save();
        res.status(201).json(history);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all history records
router.get('/gethistory', async (req, res) => {
    try {
        const historyList = await History.find();
        res.json(historyList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a history record
router.put('/updatehistory/:id', upload.single('image'), async (req, res) => {
    try {
        const { year, title, para, description } = req.body;
        const updateData = {
            year,
            title,
            para,
            description: JSON.parse(description),
        };
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const history = await History.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(history);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a point from a history record
router.put('/deletepoint/:id', async (req, res) => {
    try {
        const { pointIndex } = req.body;
        const history = await History.findById(req.params.id);
        
        if (!history) {
            return res.status(404).json({ error: 'History record not found' });
        }

        // Remove the point from the description array
        history.description.splice(pointIndex, 1);
        await history.save();

        res.json(history);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a history record
router.delete('/deletehistory/:id', async (req, res) => {
    try {
        await History.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
