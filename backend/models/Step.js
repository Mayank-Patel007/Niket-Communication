// server/models/Step.js
const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Step', stepSchema);
