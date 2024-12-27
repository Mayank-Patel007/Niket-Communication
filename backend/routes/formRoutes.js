const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Create a new form entry
router.post('/', async (req, res) => {
    try {
        const newForm = new Form(req.body);
        const savedForm = await newForm.save();
        res.status(201).json(savedForm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all form entries
router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a form entry
router.delete('/:id', async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json({ message: 'Form deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
