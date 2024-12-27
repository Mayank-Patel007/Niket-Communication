const express = require('express');
const multer = require('multer');
const TeamMember = require('../models/TeamSlider');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// GET all team members
router.get('/', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        res.json(teamMembers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new team member
router.post('/', upload.single('image'), async (req, res) => {
    const { name, position } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const teamMember = new TeamMember({
        name,
        position,
        image
    });

    try {
        const newTeamMember = await teamMember.save();
        res.status(201).json(newTeamMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a team member
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, position } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

        const updatedTeamMember = await TeamMember.findByIdAndUpdate(
            req.params.id,
            { name, position, image },
            { new: true }
        );

        res.json(updatedTeamMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a team member
router.delete('/:id', async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team member deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
