const express = require('express');
const router = express.Router();
const CompanyFacts = require('../models/CompanyFacts');

// Get company facts
router.get('/', async (req, res) => {
    try {
        const companyFacts = await CompanyFacts.findOne();
        if (!companyFacts) {
            return res.status(404).json({ message: 'No company facts found.' });
        }
        res.json(companyFacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update company facts
router.put('/', async (req, res) => {
    try {
        const updatedFacts = await CompanyFacts.findOneAndUpdate(
            {}, // Update the single document
            req.body,
            { new: true, upsert: true } // Return the updated document and create if it doesn't exist
        );
        res.json(updatedFacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
