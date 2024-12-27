const mongoose = require('mongoose');

const CompanyDataSchema = new mongoose.Schema({
    aboutCompany: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ceoName: {
        type: String,
        required: true
    },
    ceoTitle: {
        type: String,
        required: true
    },
    commercialAreaTitle: {
        type: String,
        required: true
    },
    commercialAreaDescription: {
        type: String,
        required: true
    },
    residentialAreaTitle: {
        type: String,
        required: true
    },
    residentialAreaDescription: {
        type: String,
        required: true
    },
    bbbImage: {
        type: String,
        required: true
    },
    experienceImage: {
        type: String,
        required: true
    },
    ceoImage: {
        type: String,
        required: true
    },
    signatureImage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CompanyData', CompanyDataSchema);
