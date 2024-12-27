const express = require('express');
const router = express.Router();
const NavItem = require('../models/NavItem');



// POST route to create a new nav item
router.post('/', async (req, res) => {
    try {
        const newNavItem = new NavItem(req.body);
        await newNavItem.save();
        res.status(201).json(newNavItem);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create nav item' });
    }
});

// GET route to fetch all nav items
router.get('/', async (req, res) => {
    try {
        const navItems = await NavItem.find();
        res.json(navItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch nav items' });
    }
});

// PUT route to update a nav item
router.put('/:id', async (req, res) => {
    try {
        const updatedNavItem = await NavItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNavItem);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update nav item' });
    }
});

// DELETE route to delete a nav item
router.delete('/:id', async (req, res) => {
    try {
        await NavItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Nav item deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete nav item' });
    }
});

module.exports = router;
