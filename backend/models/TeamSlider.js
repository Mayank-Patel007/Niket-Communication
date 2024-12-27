const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, required: true }, // URL or path to image
}, {
    timestamps: true,
});

const TeamSlider = mongoose.model('TeamSlider', teamMemberSchema);

module.exports = TeamSlider;
