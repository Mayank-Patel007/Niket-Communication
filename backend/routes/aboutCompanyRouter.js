const express = require('express');
const AboutCompany = require('../models/AboutCompany');

const router = express.Router();

// Get all about company information
router.get('/', async (req, res) => {
  try {
    const aboutCompany = await AboutCompany.find();
    res.json(aboutCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific about company information by id
router.get('/:id', async (req, res) => {
  try {
    const aboutCompany = await AboutCompany.findById(req.params.id);
    if (!aboutCompany) return res.status(404).json({ message: 'Not found' });
    res.json(aboutCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new about company information
router.post('/', async (req, res) => {
  const aboutCompany = new AboutCompany({
    title: req.body.title,
    description: req.body.description,
    yearsOfExperience: req.body.yearsOfExperience,
    certifications: req.body.certifications,
    ceo: req.body.ceo,
    services: req.body.services,
  });

  try {
    const newAboutCompany = await aboutCompany.save();
    res.status(201).json(newAboutCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update about company information
router.patch('/:id', async (req, res) => {
  try {
    const aboutCompany = await AboutCompany.findById(req.params.id);
    if (!aboutCompany) return res.status(404).json({ message: 'Not found' });

    if (req.body.title != null) aboutCompany.title = req.body.title;
    if (req.body.description != null) aboutCompany.description = req.body.description;
    if (req.body.yearsOfExperience != null) aboutCompany.yearsOfExperience = req.body.yearsOfExperience;
    if (req.body.certifications != null) aboutCompany.certifications = req.body.certifications;
    if (req.body.ceo != null) aboutCompany.ceo = req.body.ceo;
    if (req.body.services != null) aboutCompany.services = req.body.services;

    const updatedAboutCompany = await aboutCompany.save();
    res.json(updatedAboutCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete about company information
router.delete('/:id', async (req, res) => {
  try {
    const aboutCompany = await AboutCompany.findById(req.params.id);
    if (!aboutCompany) return res.status(404).json({ message: 'Not found' });

    await aboutCompany.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
