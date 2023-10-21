const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { userId, listingId, rating, comment } = req.body;

        const newReview = new Review({
            userId,
            listingId,
            rating,
            comment,
        });

        await newReview.save();

        res.status(201).json({ message: 'Review created successfully', newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all reviews for a listing
exports.getReviewsByListing = async (req, res) => {
    try {
        const listingId = req.params.id;

        const reviews = await Review.find({ listingId });

        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all reviews by a user
exports.getReviewsByUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const reviews = await Review.find({ userId });

        res.status(200).json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await review.remove();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
