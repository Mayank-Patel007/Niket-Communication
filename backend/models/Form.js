const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    phoneNumber: String,
    emailAddress: String,
    updates: Boolean,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    pincode: String,
    saveInfo: Boolean,
    paymentMethod: String,
    cardDetails: {
        nameOnCard: String,
        cardNumber: String,
        expiryDate: String,
        securityCode: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
