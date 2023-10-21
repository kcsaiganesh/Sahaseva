import React, { useState, useEffect } from 'react';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import {
    Container,
    Grid,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
    // State to store listing data
    const [listings, setListings] = useState([]);
    // State to store selected listing details for the dialog
    const [selectedListing, setSelectedListing] = useState(null);
    // State to store selected listing posted user details
    const [postedUserData, setPostedUserData] = useState(null);
    // State for displaying the dialog
    const [openDialog, setOpenDialog] = useState(false);

    // Function to fetch listings data from the backend
    const fetchListings = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/listing/listings');
            setListings(response.data);
        } catch (error) {
            console.error('Error fetching listings:', error.message);
        }
    };
    const handleDeleteListing = async (listingId) => {
        try {
            // Send a request to delete the listing with the given listingId
            await axios.delete(`http://localhost:4000/api/listing/${listingId}`);
            // After successful deletion, fetch the updated listings data
            fetchListings();
        } catch (error) {
            console.error('Error deleting listing:', error.message);
        }
    };
    const handleEditListing = (listing) => {
        // Implement the logic for editing a listing here
        // This could involve opening a dialog for editing or redirecting to a separate edit page.
    };

    // Function to fetch posted user data for a selected listing
    const fetchPostedUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/admin/user/${userId}`);
            console.log(response.data);
            setPostedUserData(response.data);
        } catch (error) {
            console.error('Error fetching posted user data:', error.message);
        }
    };

    // Function to handle opening the dialog and setting the selected listing
    const handleListingClick = (listings) => {
        setSelectedListing(listings);
        fetchPostedUserData(listings.userId); // Fetch posted user data for the selected listing
        setOpenDialog(true);
    };

    // Function to close the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Fetch listings data and user data when the component mounts
    useEffect(() => {
        fetchListings();
    }, []);

    // useEffect to fetch user data when selectedListing or openDialog state changes
    useEffect(() => {
        if (selectedListing && openDialog) {
            fetchPostedUserData(selectedListing.userId);
        }
    }, [selectedListing, openDialog]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Admin Dashboard
            </Typography>

            {/* Listings Table */}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Listings
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Posted User</TableCell>
                                <TableCell>Actions</TableCell> {/* Add a new column for Actions */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listings.map((listing) => (
                                <TableRow key={listing._id} hover>
                                    <TableCell>{listing._id}</TableCell>
                                    <TableCell>{listing.title}</TableCell>
                                    <TableCell>{listing.category}</TableCell>
                                    <TableCell>{listing.status}</TableCell>
                                    <TableCell>
                                        <Avatar alt={listing.postedUser?.username || ''} src={listing.postedUser?.avatar || ''} />
                                        {listing.postedUser?.username || 'Unknown User'}
                                    </TableCell>
                                    <TableCell>
                                        {/* Add the delete and edit icons with onClick handlers */}
                                        <IconButton onClick={() => handleDeleteListing(listing._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleEditListing(listing)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>


            {/* Listing Details Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                {selectedListing && postedUserData && (
                    <>
                        <DialogTitle>Listing Details</DialogTitle>
                        <DialogContent>
                            <Typography variant="h6">{selectedListing.title}</Typography>
                            <Typography>{selectedListing.description}</Typography>
                            <Typography>Price: {selectedListing.price}</Typography>
                            <Typography>Location: {selectedListing.location}</Typography>
                            <Typography>Posted User: {selectedListing.postedUser?.username || 'Unknown User'}</Typography>
                            <Typography>
                                Posted User Avatar: <Avatar alt={postedUserData.username || ''} src={postedUserData.avatar || ''} />
                            </Typography>
                            {/* Display any other user details you want to show */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Container>
    );
};

export default AdminDashboard;
