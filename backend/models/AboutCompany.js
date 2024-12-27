const mongoose = require('mongoose');

const aboutCompanySchema = new mongoose.Schema({
  title: String,
  description: String,
  yearsOfExperience: String,
  certifications: [String],
  ceo: {
    name: String,
    image: String,
    signature: String,
  },
  services: [{
    icon: String,
    category: String,
    title: String,
    description: String,
  }],
});

const AboutCompany = mongoose.model('AboutCompany', aboutCompanySchema);
module.exports = AboutCompany;
