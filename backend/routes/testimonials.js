const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const multer = require('multer');
const path = require('path');

// Set up storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Create a new testimonial
router.post('/', upload.single('image'), async (req, res) => {
    const testimonial = new Testimonial({
        name: req.body.name,
        role: req.body.role,
        testimonial: req.body.testimonial,
        image: req.file.filename
    });

    try {
        const savedTestimonial = await testimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a testimonial by ID
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            role: req.body.role,
            testimonial: req.body.testimonial,
            image: req.file ? req.file.filename : req.body.image // Use existing image if no new image is uploaded
        };

        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!testimonial) return res.status(404).send('Testimonial not found');
        res.json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a testimonial by ID
router.delete('/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) return res.status(404).send('Testimonial not found');
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/count', async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
