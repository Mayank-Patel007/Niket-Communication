const express = require('express');
const multer = require('multer');
const CarouselItem = require('../models/CarouselModel');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// GET all carousel items
router.get('/', async (req, res) => {
    try {
        const carouselItems = await CarouselItem.find();
        res.json(carouselItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new carousel item
router.post('/', upload.single('image'), async (req, res) => {
    const carouselItem = new CarouselItem({
        title: req.body.title,
        text: req.body.text,
        image: `/uploads/${req.file.filename}` 
    });

    try {
        const newCarouselItem = await carouselItem.save();
        res.status(201).json(newCarouselItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a carousel item
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const carouselItem = await CarouselItem.findById(req.params.id);
        if (!carouselItem) return res.status(404).json({ message: 'Carousel item not found' });

        // Update fields
        carouselItem.title = req.body.title;
        carouselItem.text = req.body.text;

        // Update image if provided
        if (req.file) {
            const oldImagePath = path.join(__dirname, '../uploads', carouselItem.image.split('/').pop());
            fs.unlinkSync(oldImagePath);
            carouselItem.image = `/uploads/${req.file.filename}`;
        }

        const updatedCarouselItem = await carouselItem.save();
        res.json(updatedCarouselItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE a carousel item
router.delete('/:id', async (req, res) => {
    try {
        const carouselItem = await CarouselItem.findById(req.params.id);
        if (!carouselItem) return res.status(404).json({ message: 'Carousel item not found' });

        const imagePath = path.join(__dirname, '../uploads', carouselItem.image.split('/').pop());
        fs.unlinkSync(imagePath);

        await carouselItem.remove();
        res.json({ message: 'Deleted Carousel Item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Serve static files
router.use('/uploads', express.static(uploadsDir));

// Get an image by filename
router.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

module.exports = router;
