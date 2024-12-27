const express = require('express');
const router = express.Router();
const Step = require('../models/Step');

// Getting all
router.get('/', async (req, res) => {
    try {
        const steps = await Step.find();
        res.json(steps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', getStep, (req, res) => {
    res.json(res.step);
});

// Creating one
router.post('/', async (req, res) => {
    const step = new Step({
        stepNumber: req.body.stepNumber,
        title: req.body.title,
        description: req.body.description,
        icon: req.body.icon,
    });

    try {
        const newStep = await step.save();
        res.status(201).json(newStep);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One
router.patch('/:id', getStep, async (req, res) => {
    if (req.body.stepNumber != null) {
        res.step.stepNumber = req.body.stepNumber;
    }
    if (req.body.title != null) {
        res.step.title = req.body.title;
    }
    if (req.body.description != null) {
        res.step.description = req.body.description;
    }
    if (req.body.icon != null) {
        res.step.icon = req.body.icon;
    }
    try {
        const updatedStep = await res.step.save();
        res.json(updatedStep);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One

router.delete('/:id', getStep, async (req, res) => {
    try {
        await Step.deleteOne({ _id: res.step._id });
        res.json({ message: 'Deleted Step' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getStep(req, res, next) {
    let step;
    try {
        step = await Step.findById(req.params.id);
        if (step == null) {
            return res.status(404).json({ message: 'Cannot find step' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.step = step;
    next();
}

module.exports = router;
