const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    year: { type: String, required: true },
    para: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: [String], required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const History = mongoose.model('History', historySchema);

module.exports = History;
