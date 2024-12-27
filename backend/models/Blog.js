// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    comments: {
        type: Number,
        default: 0,
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
