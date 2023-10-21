const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);

// Your existing routes and other middleware
// ...

// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
