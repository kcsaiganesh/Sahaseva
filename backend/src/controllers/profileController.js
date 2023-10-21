const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        // Retrieve the user ID from the request (assuming it's stored in req.user.id after authentication)
        const userId = req.user.id;

        // Find the user in the database based on the ID
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user profile as a response
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        // Retrieve the user ID from the request (assuming it's stored in req.user.id after authentication)
        const userId = req.user.id;

        // Find the user in the database based on the ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's profile with the new data from the request body
        user.name = req.body.name;
        user.email = req.body.email;
        user.contactDetails = req.body.contactDetails;
        user.skills = req.body.skills;
        user.preferences = req.body.preferences;

        // Save the updated user profile
        await user.save();

        // Return a response indicating success
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
