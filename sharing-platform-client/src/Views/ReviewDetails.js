import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Select, MenuItem } from '@mui/material';

const PostPage = () => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubcategoryChange = (event) => {
        setSubcategory(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handlePostNowClick = () => {
        // Handle posting the details to the backend
        // You can make an API call here to submit the data
        console.log('Posting details:', {
            category,
            subcategory,
            title,
            description,
            location,
            mobileNumber,
        });
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">Select Category</Typography>
                    <Select value={category} variant="outlined" fullWidth onChange={handleCategoryChange}>
                        <MenuItem value="">Select Category</MenuItem>
                        {/* Add category options */}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Select Subcategory</Typography>
                    <Select value={subcategory} variant="outlined" fullWidth onChange={handleSubcategoryChange}>
                        <MenuItem value="">Select Subcategory</MenuItem>
                        {/* Add subcategory options based on the selected category */}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Title</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Description</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Location</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={location}
                        onChange={handleLocationChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Mobile Number</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={mobileNumber}
                        onChange={handleMobileNumberChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handlePostNowClick}>
                        Post Now
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PostPage;
