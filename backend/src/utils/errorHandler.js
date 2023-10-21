// errorHandling.js

// Function to handle errors and send appropriate response
const errorHandler = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
