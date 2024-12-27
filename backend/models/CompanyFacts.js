const mongoose = require('mongoose');

const companyFactsSchema = new mongoose.Schema({
    yearsOfExperience: { type: Number, required: true, default: 4 },
    teamMembers: { type: Number, required: true, default: 127 },
    objectsProtected: { type: Number, required: true, default: 2800 },
    corporateOffices: { type: Number, required: true, default: 36 },
}, { timestamps: true });

const CompanyFacts = mongoose.model('CompanyFacts', companyFactsSchema);

module.exports = CompanyFacts;
