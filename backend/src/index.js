require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const allowedOrigins = ['http://localhost:3000'];


const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: ['Authorization', 'Content-Type'],
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Routes importing
const authRoutes = require('./routes/authRoutes');
const sendEmailRoute = require('./routes/sendEmail');
const homeRoutes = require('./routes/homeRoutes');
const listingRoutes = require('./routes/listingRoutes');
const messageRoutes = require('./routes/sendEmail');
const reviewRoutes = require('./routes/reviewRoutes');
const profileRoutes = require('./routes/profileRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const adminRoutes = require('./routes/adminRoutes');


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contactseller', sendEmailRoute);




// Connect to MongoDB database
const connectDB = require('./connection');

connectDB()
    .then(() => {
        const server = http.createServer(app);
        const io = socketIO(server);
        app.set('socketio', io);

        // Socket.IO logic
        io.on('connection', (socket) => {
            console.log('A user connected');

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });

        const port = process.env.PORT || 4000;
        server.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
