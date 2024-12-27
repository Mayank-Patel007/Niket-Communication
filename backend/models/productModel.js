const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    quantity:{type:String,required:true}
},{timestamps:true});

const Product = mongoose.model('cart', productSchema);

module.exports = Product;
