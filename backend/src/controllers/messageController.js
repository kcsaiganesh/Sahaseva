const Message = require('../models/Message');

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all messages between two users
exports.getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        });

        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        await message.remove();

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
