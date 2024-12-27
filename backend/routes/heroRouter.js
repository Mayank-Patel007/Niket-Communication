// routes/hero.js
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const Hero = require("../models/Hero")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: function (req, file, cb) {
        // Unique filename using current timestamp and original file extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET route to fetch the hero content
router.get('/gethero', async (req, res) => {
    try {
        const hero = await Hero.findOne(); // Fetching the single hero content
        if (!hero) return res.status(404).json({ message: 'Hero content not found' });
        res.json(hero);
    } catch (error) {
        console.error('Error fetching hero content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT route to update the hero content
router.put('/edithero', upload.fields([
    { name: 'heroImageSrc', maxCount: 1 },
    { name: 'fourImageSrc', maxCount: 1 },
    { name: 'ceoImageSrc', maxCount: 1 },
    { name: 'signatureImageSrc', maxCount: 1 }
]), async (req, res) => {
    try {
        // Extract text fields
        const {
        
            professionalDescription,
            detailDescription,
            ceoName,
            ceoPosition,
            quote,
            numberFour,
            plusSign
        } = req.body;

        console.log(req.body)
        console.log(req.files)

        // Extract file fields and generate URLs
        const heroImageSrc = req.files['heroImageSrc'] ? req.files['heroImageSrc'][0].filename : '';
        const fourImageSrc = req.files['fourImageSrc'] ? req.files['fourImageSrc'][0].filename : '';
        const ceoImageSrc = req.files['ceoImageSrc'] ? req.files['ceoImageSrc'][0].filename : '';
        const signatureImageSrc = req.files['signatureImageSrc'] ? req.files['signatureImageSrc'][0].filename : '';

        // Construct the update object
        const updateData = {
      
            professionalDescription,
            detailDescription,
            ceoName,
            ceoPosition,
            quote,
            numberFour,
            plusSign,
            heroImageSrc, 
            fourImageSrc,
            ceoImageSrc,
            signatureImageSrc
        };

        // Find and update the hero
        const hero = await Hero.findOneAndUpdate({}, updateData, { new: true, upsert: true });

        res.json(hero);
    } catch (error) {
        console.error('Error updating hero content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
