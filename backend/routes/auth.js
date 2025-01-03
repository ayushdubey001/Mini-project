const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();


const path = require('path');



// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) { // For session-based auth
    return next();
  }
  res.redirect('/login.html'); // Redirect to login if not authenticated
}

// Serve the dashboard page after login
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dashboard.html')); // Adjust the path if necessary
});




router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Store session info
    req.session.userId = user._id; // Save user ID in session
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;









