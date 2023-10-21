// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        const decodedToken = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decodedToken;

        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
