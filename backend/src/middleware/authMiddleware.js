const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => { // Remove the outer parentheses here
    console.log("Auth middleware called");
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };
        console.log("userid is being got :", decoded);
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware; // Export the middleware function directly
