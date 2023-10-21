const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloudName: 'dnjh6odhb',
    apiKey: '677369172767856',
    api_secret: 'o4sBz11t_9S3sYW7FaC8QAniCSA',
});

// Upload photo route
router.post('/upload', async (req, res) => {
    if (!req.files || !req.files.photo) {
        return res.status(400).json({ message: 'No file provided' });
    }

    try {
        const photoFile = req.files.photo;
        const result = await cloudinary.uploader.upload(photoFile.tempFilePath, {
            folder: 'uploads', // Optional folder in Cloudinary
        });

        const photoUrl = result.secure_url;
        res.status(200).json({ url: photoUrl });
    } catch (error) {
        console.error('Error uploading photo to Cloudinary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
