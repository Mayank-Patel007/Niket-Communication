const express = require('express');
const multer = require('multer');
const Blog = require('../models/Blog');
const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// GET all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/limited', async (req, res) => {
    try {
        const blogs = await Blog.find().limit(3);
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new blog post
router.post('/', upload.single('image'), async (req, res) => {
    const { category, author, date, title, comments } = req.body;
    const image = req.file ? req.file.filename : '';

    const newBlog = new Blog({
        image,
        category,
        author,
        date,
        title,
        comments,
    });

    try {
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a blog post by ID
router.put('/:id', upload.single('image'), async (req, res) => {
    const { category, author, date, title, comments } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { image, category, author, date, title, comments },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) return res.status(404).json({ message: 'Blog post not found' });

        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog post not found' });
        res.json({ message: 'Blog post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
