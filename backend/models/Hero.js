// models/Hero.js

const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({

    professionalDescription: {
        type: String,
        required: true
    },
    detailDescription: {
        type: String,
        required: true
    },
    ceoName: {
        type: String,
        required: true
    },
    ceoPosition: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    heroImageSrc: {
        type: String,
        required: true
    },
    fourImageSrc: {
        type: String,
        required: true
    },
    ceoImageSrc: {
        type: String,
        required: true
    },
    signatureImageSrc: {
        type: String,
        required: true
    },
    numberFour: {
        type: Number,
        required: true,
        default: 4
    },
    plusSign: {
        type: String,
        required: true,
        default: '+'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hero', heroSchema);
