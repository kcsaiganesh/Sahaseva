const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
