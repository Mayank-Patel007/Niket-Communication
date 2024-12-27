const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const TeamMember = require('../models/teamMember'); // Corrected the model path

// Set up storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only images are allowed!'), false);
        }
    }
});

// Create a new team member
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const teamMember = new TeamMember({
        name: req.body.name,
        role: req.body.role,
        image: req.file.filename
    });

    try {
        const savedTeamMember = await teamMember.save();
        res.status(201).json(savedTeamMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all team members
router.get('/', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        res.json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get limited team members (for example, 3 team members)
router.get('/limited', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find().limit(3);
        res.json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a team member by ID
router.get('getData/:id', async (req, res) => {
    try {
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) return res.status(404).json({ message: 'Team member not found' });
        res.json(teamMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a team member by ID
router.put('/:id', upload.single('image'), async (req, res) => {
    const updatedData = {
        name: req.body.name,
        role: req.body.role,
    };

    if (req.file) {
        updatedData.image = req.file.filename;
    }

    try {
        const teamMember = await TeamMember.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!teamMember) return res.status(404).json({ message: 'Team member not found' });
        res.json(teamMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a team member by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
        if (!teamMember) return res.status(404).json({ message: 'Team member not found' });
        res.json({ message: 'Team member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// New route to get team member count
router.get('/getcount', async (req, res) => {
    try {
        const count = await TeamMember.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
