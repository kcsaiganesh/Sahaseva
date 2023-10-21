const Notification = require('../models/Notification');

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        // Retrieve all notifications from the database
        const notifications = await Notification.find();

        // Return the notifications as a response
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
    // Retrieve the notification ID from the request
    const notificationId = req.params.id;

    try {
        // Find the notification in the database based on the ID
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        // Update the notification status to 'read'
        notification.status = 'read';

        // Save the updated notification
        await notification.save();

        // Return a response indicating success
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    // Retrieve the notification ID from the request
    const notificationId = req.params.id;

    try {
        // Find the notification in the database based on the ID
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        // Delete the notification from the database
        await notification.remove();

        // Return a response indicating success
        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
