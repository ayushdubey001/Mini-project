const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Adjust the path if needed

// POST route to save feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create and save feedback in MongoDB
    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});




// Route to fetch all feedbacks
router.get('/feedbacks', async (req, res) => {
  try {
      const feedbacks = await Feedback.find().sort({ date: -1 }); // Sort by most recent
      res.json(feedbacks);
  } catch (error) {
      res.status(500).send('Error fetching feedbacks');
  }
});

module.exports = router;
