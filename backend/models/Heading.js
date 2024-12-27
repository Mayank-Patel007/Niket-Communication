const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Heading model
const headingSchema = new Schema({
    pageType: {
        type: String,
        required: true,
        enum: ['product', 'testimonials', 'blogs', 'services', 'pricing', 'steps', 'projects', 'company' , 'our-services', 'estimation', 'history','facts', 'storage', 'special-services','get-in-touch' ],
    },
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
});

// Create the Heading model
const Heading = mongoose.model('Heading', headingSchema);

module.exports = Heading;
