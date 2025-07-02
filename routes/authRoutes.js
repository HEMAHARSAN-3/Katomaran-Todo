const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    // In production, hash the password!
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 