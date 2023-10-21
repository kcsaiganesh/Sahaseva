const socketIO = require('socket.io');
const Message = require('../models/Message');

const initializeSocket = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Handle sending and receiving messages
        socket.on('sendMessage', async (message) => {
            try {
                // Save the message to the database
                const newMessage = new Message({
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    message: message.message,
                });
                await newMessage.save();

                // Emit the received message to the sender and receiver
                io.to(message.senderId).emit('receivedMessage', newMessage);
                io.to(message.receiverId).emit('receivedMessage', newMessage);
            } catch (error) {
                console.error(error);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};

module.exports = initializeSocket;
