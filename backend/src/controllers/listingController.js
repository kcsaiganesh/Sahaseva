const Listing = require('../models/Listing');

// Create a new listing
exports.createListing = async (req, res) => {
    try {
        const { userId, title, description, category, location, termsConditions, photos } = req.body;

        const listing = new Listing({
            userId,
            title,
            description,
            category,
            location,
            termsConditions,
            photos,
        });

        await listing.save();

        res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all listings
exports.getListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json({ listings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single listing by ID
exports.getListingById = async (req, res) => {
    try {
        const listingId = req.params.id;
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        res.status(200).json({ listing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a listing by ID
exports.updateListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const { title, description, category, location, termsConditions, photos } = req.body;

        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        listing.title = title;
        listing.description = description;
        listing.category = category;
        listing.location = location;
        listing.termsConditions = termsConditions;
        listing.photos = photos;
        listing.updatedAt = Date.now();

        await listing.save();

        res.status(200).json({ message: 'Listing updated successfully', listing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a listing by ID
exports.deleteListing = async (req, res) => {
    try {
        const listingId = req.params.id;

        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        await listing.remove();

        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
