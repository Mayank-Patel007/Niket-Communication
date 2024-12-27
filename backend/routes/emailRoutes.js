// emailRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Email model
const EmailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
});
const Email = mongoose.model('Email', EmailSchema);

// Controller methods

// Subscribe an email
const subscribeEmail = async (req, res) => {
    try {
        const newEmail = new Email({ email: req.body.email });
        await newEmail.save();
        res.status(201).json({ message: 'Email subscribed successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error subscribing email', error });
    }
};

// Get all emails
const getEmails = async (req, res) => {
    try {
        const emails = await Email.find();
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching emails', error });
    }
};

const countEmails = async (req, res) => {
    try {
        const emailCount = await Email.countDocuments();
        res.json({ count: emailCount });
    } catch (error) {
        res.status(500).json({ message: 'Error counting emails' });
    }
};

// Delete an email
const deleteEmail = async (req, res) => {
    try {
        await Email.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Email deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting email', error });
    }
};

// Routes
router.post('/subscribe', subscribeEmail);
router.get('/', getEmails);
router.delete('/:id', deleteEmail);
router.get('/count', countEmails);

module.exports = router;
