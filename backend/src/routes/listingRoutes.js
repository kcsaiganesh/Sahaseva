const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Listing = require('../models/Listing');

// Get all listings
router.get('/listings', async (req, res) => {
    try {
        console.log("listings are been called");
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a new listing
router.post('/listings', authMiddleware, async (req, res) => {
    try {
        const { category, subcategory, title, description, location, mobileNumber, photoUrl, price } = req.body;
        const userId = req.user.userId;
        console.log("line after the userId is been found");
        console.log("UserId", userId);


        const newListing = new Listing({
            category,
            subcategory,
            title,
            description,
            location,
            mobileNumber,
            userId,
            photoUrl,
            price,
        });
        console.log(newListing);
        try {
            await newListing.save();
            // Success: Listing saved successfully
        } catch (error) {
            console.error('Error saving listing:', error);
            // Handle the error accordingly
        }

        console.log("line after the listing is been saved");

        res.status(201).json({ message: 'Listing created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a single listing
router.get('/listings/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a listing
router.put('/listings/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description, category, location } = req.body;

        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        if (listing.userId !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        listing.title = title;
        listing.description = description;
        listing.category = category;
        listing.location = location;
        await listing.save();

        res.status(200).json({ message: 'Listing updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a listing
router.delete('/listings/:id', authMiddleware, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        if (listing.userId !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await listing.remove();

        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
