const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../models/Project');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// // Get a project by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);
//         res.json(project);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// Create a new project
router.post('/', upload.single('image'), async (req, res) => {
    const { title, subtitle } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        const newProject = new Project({ title, subtitle, image });
        await newProject.save();
        res.json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a project
router.put('/:id', upload.single('image'), async (req, res) => {
    const { title, subtitle } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.title = title || project.title;
        project.subtitle = subtitle || project.subtitle;
        project.image = image || project.image;

        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Delete the project
        await Project.deleteOne({ _id: req.params.id });

        // If you want to delete the image file, add this logic
        if (project.image) {
            const fs = require('fs');
            const path = require('path');
            const imagePath = path.join(__dirname, '..', project.image);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                }
            });
        }

        res.json({ message: 'Project deleted' });
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get count of products
router.get('/count', async (req, res) => {
    try {
        const count = await Project.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
