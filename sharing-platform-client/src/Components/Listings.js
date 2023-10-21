import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container, Avatar, CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import axios from 'axios';

const defaultTheme = createTheme();

const ResourceListingForm = () => {
    const [listings, setListings] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch existing listings from the backend API
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await axios.get('/api/listings');
            setListings(response.data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleInputChange = (event) => {
        if (event.target.name === 'image') {
            setFormData({ ...formData, image: event.target.files[0] });
        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateFormData();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const { title, description, image } = formData;

            // Create a new FormData instance to send the multipart/form-data
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image);

            // Make a POST request to the backend API to create the listing
            await axios.post('/api/listings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Clear form data and fetch updated listings
            setFormData({ title: '', description: '', image: null });
            setErrors({});
            fetchListings();
        } catch (error) {
            console.error('Error creating listing:', error);
        }
    };

    const validateFormData = () => {
        const errors = {};
        const { title, description, image } = formData;

        if (!title.trim()) {
            errors.title = 'Title is required';
        }

        if (!description.trim()) {
            errors.description = 'Description is required';
        }

        if (!image) {
            errors.image = 'Image is required';
        }

        return errors;
    };

    const handleDelete = async (listingId) => {
        try {
            // Make a DELETE request to the backend API to delete the listing
            await axios.delete(`/api/listings/${listingId}`);
            fetchListings();
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Listing
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    error={errors.title}
                                    helperText={errors.title}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    error={errors.description}
                                    helperText={errors.description}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="image"
                                    label="Image"
                                    name="image"
                                    type="file"
                                    onChange={handleInputChange}
                                    error={errors.image}
                                    helperText={errors.image}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Create
                        </Button>
                    </Box>
                </Box>

                <Box mt={4}>
                    <Typography component="h2" variant="h6">
                        Listings
                    </Typography>
                    {listings.length > 0 ? (
                        <ul>
                            {listings.map((listing) => (
                                <li key={listing.id}>
                                    <h3>{listing.title}</h3>
                                    <p>{listing.description}</p>
                                    <img src={listing.image} alt={listing.title} width="200" />
                                    <Button variant="contained" color="error" onClick={() => handleDelete(listing.id)}>
                                        Delete
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No listings found.</p>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ResourceListingForm;
