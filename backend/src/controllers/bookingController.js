const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const User = require('../models/User');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { listingId, startDate, endDate } = req.body;
        const userId = req.user.id; // Assuming you have implemented user authentication and have access to the authenticated user's ID

        // Check if the listing exists and is available for booking
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        if (!listing.available) {
            return res.status(400).json({ error: 'Listing is not available for booking' });
        }

        // Check if the booking dates are valid and available
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if (startDateObj >= endDateObj) {
            return res.status(400).json({ error: 'Invalid booking dates' });
        }
        // Assuming you have a function to check availability based on the listing and booking dates
        const isAvailable = checkAvailability(listingId, startDateObj, endDateObj);
        if (!isAvailable) {
            return res.status(400).json({ error: 'Listing is not available for the selected dates' });
        }

        // Create the booking
        const booking = new Booking({
            listingId,
            userId,
            startDate: startDateObj,
            endDate: endDateObj,
            status: 'pending', // Set the initial status to 'pending'
        });
        await booking.save();

        // Update the listing's availability status
        listing.available = false;
        await listing.save();

        // Add the booking to the user's bookings array
        const user = await User.findById(userId);
        user.bookings.push(booking._id);
        await user.save();

        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Check availability for a given listing and booking dates
const checkAvailability = async (listingId, startDate, endDate) => {
    // Add your logic to check if the listing is available for the given dates
    // You can query existing bookings and compare the dates to determine availability
    // Return true if available, false otherwise
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have implemented user authentication and have access to the authenticated user's ID

        // Retrieve the user's bookings
        const bookings = await Booking.find({ userId }).populate('listingId');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all bookings for a listing
exports.getListingBookings = async (req, res) => {
    try {
        const listingId = req.params.listingId;

        // Retrieve the listing's bookings
        const bookings = await Booking.find({ listingId }).populate('userId');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
