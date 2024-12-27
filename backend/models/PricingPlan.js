const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desp: { type: String, required: true },
  price: { type: String, required: true },
  features: { type: [String], required: true },
});

module.exports = mongoose.model('PricingPlan', pricingPlanSchema);
