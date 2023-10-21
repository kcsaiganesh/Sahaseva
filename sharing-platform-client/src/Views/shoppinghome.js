import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResourceServiceListings = () => {

    const [listings, setListings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const refreshPage = () => window.location.reload();


    useEffect(() => {
        fetchListings();
    }, [searchQuery]);

    const fetchListings = async () => {
        try {


            const response = await axios.get('http://localhost:4000/api/listing/listings', {
                params: {
                    searchQuery,
                },
            });
            const fetchedListings = response.data.map((listing) => {
                return {
                    ...listing,
                    photoUrls: listing.photoUrl.map((url) => `${url}`),
                };
            });
            setListings(fetchedListings);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filterListings = (listings, searchQuery) => {
        if (searchQuery.trim() === '') {
            return listings; // Return all listings if search query is empty
        }
        const filteredListings = listings.filter((listing) => {
            const { title, description, category, location } = listing;
            const lowerSearchQuery = searchQuery.toLowerCase();
            return (
                title.toLowerCase().includes(lowerSearchQuery) ||
                description.toLowerCase().includes(lowerSearchQuery) ||
                category.toLowerCase().includes(lowerSearchQuery) ||
                location.toLowerCase().includes(lowerSearchQuery)
            );
        });
        return filteredListings;
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };



    const filteredListings = filterListings(listings, searchQuery);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} alignItems="center">
                {/* Search Bar */}
                <Grid item xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        label="Search"
                        placeholder="Search for products or skills"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                    />
                </Grid>
                {/* Create Post Button */}
                <Grid item xs={12} md={6} textAlign="right">
                    <Button variant="contained" color="primary" component={Link} to="/post">
                        Create Post
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="h5" sx={{ mt: 4 }}>
                Resource and Service Listings
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {filteredListings.map((listing) => (
                    <Grid item xs={12} sm={6} md={4} key={listing._id}>
                        <motion.div
                            whileHover={{ y: -10, boxShadow: '0px 5px 8px rgba(0, 153, 255, 0.4)' }}

                            whileTap={{ scale: 0.95 }}
                            initial={{ y: '100%' }} // Initial position is below the container
                            animate={{ y: 0 }} // Final position is at 0 (current position)
                            transition={{ type: 'spring', damping: 15, stiffness: 300 }} // Add a spring animation
                            style={{
                                backgroundColor: '#f5f5f5',
                                height: '200px',
                                borderRadius: '8px',
                                padding: '16px',
                                cursor: 'pointer',
                                backgroundImage: `url(${listing.photoUrls[0]})`, // Set the photo as background image
                                backgroundSize: 'cover', // Cover the entire container
                                backgroundPosition: 'center', // Center the photo within the container
                                position: 'relative', // Add position relative to handle overlay
                            }}
                            onClick={() => handleProductClick(listing._id)}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    background: 'rgba(255, 255, 255, 0.7)', // Add a semi-transparent white background
                                    borderRadius: '0 0 8px 8px', // Round the bottom corners
                                    padding: '8px',
                                    zIndex: 2,
                                }}
                            >
                                <Typography variant="h6">{listing.title}</Typography>
                                <Typography variant="body2">{listing.category}</Typography>

                            </div>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ResourceServiceListings;
