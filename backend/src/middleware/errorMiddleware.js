// Middleware to handle errors
exports.errorMiddleware = (error, req, res, next) => {
    console.error(error);

    // Set a default status code if it's not already set
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    // Format the error response
    const errorResponse = {
        message: error.message || 'Internal Server Error',
    };

    // Send the error response to the client
    res.status(statusCode).json(errorResponse);
};
