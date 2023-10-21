// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Profile = require('../models/Profile');
const User = require('../models/User');

// Route to get all profiles (accessible only to admin)
router.get('/profiles', authMiddleware, async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/user/:userRefId', async (req, res) => {
    try {
        console.log("userref is been called");
        const userRefId = req.params.userRefId;
        const user = await User.findOne({ userId: userRefId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user by userReferenceId:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
