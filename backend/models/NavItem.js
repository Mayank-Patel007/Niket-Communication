// backend/models/NavItem.js
const mongoose = require('mongoose');

const navItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const NavItem = mongoose.model('NavItem', navItemSchema);
module.exports = NavItem;
