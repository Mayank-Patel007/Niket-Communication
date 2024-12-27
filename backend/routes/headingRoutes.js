const express = require('express');
const Heading = require('../models/Heading');
const router = express.Router();

router.get('/getheading', async (req, res) => {
    const { pageType } = req.query;
    try {
      const heading = await Heading.findOne({ pageType });
      if (!heading) {
        return res.status(404).json({ message: 'Heading not found' });
      }
      res.json(heading);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  // Route to edit Heading by pageType
  router.put('/editheading', async (req, res) => {
    const { pageType } = req.query;
    const { title, subTitle } = req.body;
    try {
        const heading = await Heading.findOneAndUpdate(
            { pageType },
            { title, subTitle },
            { new: true, runValidators: true, upsert: true }  // upsert: true will create a new document if no match is found
        );
        res.json(heading);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
  
  module.exports = router;