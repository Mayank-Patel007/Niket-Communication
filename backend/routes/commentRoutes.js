const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

// Create a new comment
router.post('/comments', async (req, res) => {
    try {
        const { name, email, comment } = req.body;
        const newComment = new Comment({ name, email, comment });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
});

// Get all comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
});

// Delete a comment by ID
router.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
});

// Count comments
router.get('/comments/count', async (req, res) => {
    try {
        const commentCount = await Comment.countDocuments();
        res.json({ count: commentCount });
    } catch (error) {
        res.status(500).json({ message: 'Error counting comments' });
    }
});

module.exports = router;
