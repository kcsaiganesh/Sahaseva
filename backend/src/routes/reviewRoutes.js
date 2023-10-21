const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Listing = require('../models/Listing');

router.post('/review/:id', async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const listingId = req.params.id;

        // Check if the listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Validate rating and review
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating value' });
        }
        if (!review || review.trim() === '') {
            return res.status(400).json({ message: 'Review is required' });
        }

        const newReview = new Review({
            listingId,
            rating,
            comment,
        });

        await newReview.save();

        // Update the listing with the new review
        listing.reviews.push(newReview._id);
        await listing.save();

        res.status(201).json({ message: 'Review created successfully', review: newReview });
        // res.status(200).json({ message: 'routes is been called successfully' });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/allreviews/:id', async (req, res) => {
    try {
        const listingId = req.params.id;

        // Check if the listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Fetch the reviews associated with the listing
        const reviews = await Review.find({ listingId });

        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
