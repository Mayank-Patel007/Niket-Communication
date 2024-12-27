const express = require('express');
const router = express.Router();
const {requireCustomerAuth} = require("../middleware/customerAuthMiddlewere")
const Cart = require('../models/Cart'); // Adjust path as needed

router.get('/api/cart', requireCustomerAuth, async (req, res) => {
    try {
        const customerId = req.customerId;
        console.log(`Fetching cart for customer: ${customerId}`); // Debugging line
        const cart = await Cart.find({ customerId });
        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart data: ', error);
        res.status(500).json({ message: 'Error fetching cart data' });
    }
});

// Fetch number of cart items for a specific customer
router.get('/api/cart/count', requireCustomerAuth, async (req, res) => {
    try {
        const customerId = req.customerId;
        console.log(`Fetching cart count for customer: ${customerId}`); // Debugging line
        const cart = await Cart.findOne({ customerId });
        const itemCount = cart ? cart.items.length : 0;
        res.json({ count: itemCount });
    } catch (error) {
        console.error('Error fetching cart item count: ', error);
        res.status(500).json({ message: 'Error fetching cart item count' });
    }
});

// Remove an item from the cart
router.delete('/api/cart/:productId', requireCustomerAuth, async (req, res) => {
    try {
        const { productId } = req.params;
        const customerId = req.customerId;
        console.log(`Removing item ${productId} from cart for customer: ${customerId}`); // Debugging line
        await Cart.updateOne(
            { customerId },
            { $pull: { items: { productId } } }
        );
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart: ', error);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
});

// Update item quantity in the cart
router.put('/api/cart/:productId', requireCustomerAuth, async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const customerId = req.customerId;
        console.log(`Updating quantity of item ${productId} to ${quantity} for customer: ${customerId}`); // Debugging line
        await Cart.updateOne(
            { customerId, 'items.productId': productId },
            { $set: { 'items.$.quantity': quantity } }
        );
        res.status(200).json({ message: 'Quantity updated' });
    } catch (error) {
        console.error('Error updating quantity: ', error);
        res.status(500).json({ message: 'Error updating quantity' });
    }
});

module.exports = router;
