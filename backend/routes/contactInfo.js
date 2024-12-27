const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactInfo');

// POST route to create or update contact info
router.post('/', async (req, res) => {
    try {
        const contactInfo = await ContactInfo.findOneAndUpdate({}, req.body, { upsert: true, new: true });
        res.status(201).json(contactInfo);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create or update contact info' });
    }
});

// GET route to fetch contact info
router.get('/', async (req, res) => {
    try {
        const contactInfo = await ContactInfo.findOne();
        res.json(contactInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contact info' });
    }
});

module.exports = router;
