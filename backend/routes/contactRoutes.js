const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create a new contact entry
router.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all contact entries
router.get('/editcontacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a contact entry by ID
router.delete('/deletecontacts/:id', async (req, res) => {
    try {
        console.log('Delete request received for ID:', req.params.id); // Add this line
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            console.log('Contact not found'); // Add this line
            return res.status(404).json({ message: 'Contact not found' });
        }
        await contact.deleteOne();
        console.log('Contact deleted'); // Add this line
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        console.error('Error deleting contact:', err.message); // Add this line
        res.status(500).json({ message: err.message });
    }
});

// Get the count of contacts
router.get('/contacts/count', async (req, res) => {
    try {
        const count = await Contact.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
