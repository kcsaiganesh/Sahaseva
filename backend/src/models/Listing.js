const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Jobs', 'Bikes', 'Electronic Appliances', 'Commercial Vehicles', 'Furniture', 'Fashion', 'Sports', 'Education', 'Services (Catering)', 'Others'],
    },
    subcategory: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    termsConditions: {
        type: String,
    },
    photoUrl: [{
        type: String,
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: String,
        required: true,
    },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
