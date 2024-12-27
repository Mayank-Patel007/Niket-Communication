const express = require('express');
const router = express.Router();
const PricingPlan = require('../models/PricingPlan');

// Get all pricing plans
router.get('/', async (req, res) => {
  try {
    const plans = await PricingPlan.find();
    res.json(plans);
  } catch (err) {
    console.error('Error fetching pricing plans:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new pricing plan
router.post('/', async (req, res) => {
    console.log(req.body)
  const { name, desp, price, features } = req.body;
  const newPlan = new PricingPlan({ name, desp, price, features });
  try {
    const savedPlan = await newPlan.save();
    res.json(savedPlan);
  } catch (err) {
    console.error('Error saving pricing plan:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a pricing plan
router.put('/:id', async (req, res) => {
  const { name, desp, price, features } = req.body;
  try {
    const updatedPlan = await PricingPlan.findByIdAndUpdate(
      req.params.id,
      { name, desp, price, features },
      { new: true }
    );
    res.json(updatedPlan);
  } catch (err) {
    console.error('Error updating pricing plan:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a pricing plan
router.delete('/:id', async (req, res) => {
  try {
    await PricingPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pricing plan deleted successfully' });
  } catch (err) {
    console.error('Error deleting pricing plan:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
