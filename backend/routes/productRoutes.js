const express = require('express');
const cart = require('../models/productModel');

const router = express.Router();

// Get all carts
router.get('/', async (req, res) => {
    try {
        const carts = await cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new cart
router.post('/', async (req, res) => {
    const { name, price, quantity, imageUrl } = req.body;
    try {
        const newcart = new cart({ name, price, quantity, imageUrl });
        await newcart.save();
        res.status(200).json(newcart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing cart item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const updatedCart = await cart.findByIdAndUpdate(id, { quantity }, { new: true });
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a cart
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await cart.findByIdAndDelete(id);
        res.status(200).json({ message: 'cart deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



module.exports = router;
