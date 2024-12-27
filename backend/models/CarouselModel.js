const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
    title: String,
    text: String,
    image: String,
});

const CarouselItem = mongoose.model('CarouselItem', carouselSchema);

module.exports = CarouselItem;
