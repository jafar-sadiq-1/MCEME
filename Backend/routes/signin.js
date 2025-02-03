const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Signup Route


// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.password !== password) return res.status(400).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in.' });
  }
});

// View All Users Route
router.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users.', error: err.message });
    }
  });

router.post('/add_users', async (req, res) => {
  const { firstName, middleName, lastName, designation, mobileNumber, email, username, password } = req.body;

  try {
    const newUser = new User({ firstName, middleName, lastName, designation, mobileNumber, email, username, password });
    await newUser.save();
    res.json({ message: 'user added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user.', error: err.message });
  }
});


router.delete("/delete_user/:id", async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  console.log('got you')
  res.json(result ? { message: "Deleted" } : { error: "Not found" });
});
  

module.exports = router;