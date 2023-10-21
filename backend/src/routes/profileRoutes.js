const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Profile = require('../models/Profile');
const User = require('../models/User');

// console.log("createing profile is begin called");
// Route for creating or updating user profile
router.post('/profilecreation', authMiddleware, async (req, res) => {
    console.log("creating profile is begin called");
    try {
        // Retrieve the authenticated user's ID from the request object
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract profile data from the request body
        const { name, email, phone, skills, photourl } = req.body;

        // Create or update the user's profile in the database
        let profile = await Profile.findOne({ user: userId });
        console.log("profile is :", profile);

        if (profile) {
            // Profile exists, update the existing profile
            profile.name = name;
            profile.email = email;
            profile.phone = phone;
            profile.skills = skills;
            profile.photourl = photourl;

        } else {
            // Profile does not exist, create a new profile
            profile = new Profile({
                user: userId,
                name,
                email,
                phone,
                skills,
                photourl,

            });
        }
        console.log(profile)

        try {
            // Save the profile to the database
            await profile.save();
            res.json({ message: 'Profile created/updated successfully', profile });
        } catch (error) {
            console.error('Error saving profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Get the authenticated user's ID from the request object (already set by the authMiddleware)
        const userId = req.user.userId;

        // Get the profile by ID from the database using the authenticated user's ID
        const profile = await Profile.findOne({ user: userId });

        // Check if the profile exists
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Get the user data from the User model using the user ID
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Combine the profile and user data and send it as the response
        const userData = {
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            skills: profile.skills,
            photourl: profile.photourl,
            location: profile.location,
            experience: profile.experience,
            education: profile.education,
            username: user.username,
            avatar: user.avatar,
        };

        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for listing all profiles (Admin operation)
router.get('/list', authMiddleware, async (req, res) => {
    try {
        // Check if the authenticated user is an admin
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Get all profiles from the database
        const profiles = await Profile.find().populate('user', ['username', 'avatar']);
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for getting a single profile by ID (Admin operation)
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Get the authenticated user's ID from the request object (already set by the authMiddleware)
        const userId = req.user.userId;

        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route for getting the authenticated user's profile

router.get('/currentuser', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId; // Use req.user.userId instead of req.params.userId
        console.log("buyer userid", userId);
        const profile = await Profile.findOne({ user: userId });


        console.log("buyers email", profile.email);
        res.json(profile); // Send the profile object as the JSON response
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId);
        const profile = await Profile.findOne({ user: userId });
        console.log(profile.email);
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Route for updating a profile by ID (Admin operation)
router.put('/list/:id', authMiddleware, async (req, res) => {
    try {
        // Check if the authenticated user is an admin
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Get the profile by ID from the database
        const profileId = req.params.id;
        let profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Extract updated profile data from the request body
        const { name, email, phone, skills, photourl, location, experience, education } = req.body;

        // Update the profile
        profile.name = name;
        profile.email = email;
        profile.phone = phone;
        profile.skills = skills;
        profile.photourl = photourl;
        profile.location = location;
        profile.experience = experience;
        profile.education = education;

        // Save the updated profile to the database
        await profile.save();

        res.json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for deleting a profile by ID (Admin operation)
router.delete('/list/:id', authMiddleware, async (req, res) => {
    try {
        // Check if the authenticated user is an admin
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Get the profile by ID from the database
        const profileId = req.params.id;
        let profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Delete the profile from the database
        await profile.remove();

        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        // Get the profile ID from the request parameters
        const profileId = req.params.id;

        // Get the profile by ID from the database
        const profile = await Profile.findById(profileId).populate('user', ['email']); // Populate only the email field from the user model
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json({ email: profile.user.email }); // Respond with the user's email from the profile
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
