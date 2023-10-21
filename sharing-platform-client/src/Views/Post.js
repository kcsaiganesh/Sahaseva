import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Select, MenuItem, Snackbar, styled, CircularProgress, Alert, Backdrop } from '@mui/material';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [price, setPrice] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const navigate = useNavigate();
    const [photo, setPhoto] = useState('');
    const [islisting, setIslisting] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };
    const FileInputButton = styled('label')(({ theme }) => ({
        display: 'inline-block',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1.5, 4),
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',

        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },

        '& input': {
            display: 'none',
        },
    }));

    const categories = [
        {
            label: 'Jobs',
            options: ['Software Development', 'Marketing', 'Sales', 'Finance', 'Customer Service'],
        },
        {
            label: 'Bikes',
            options: ['Mountain Bikes', 'Road Bikes', 'Hybrid Bikes', 'Electric Bikes', 'Folding Bikes'],
        },
        {
            label: 'Electronic Appliances',
            options: ['Television', 'Refrigerator', 'Washing Machine', 'Air Conditioner', 'Microwave'],
        },
        {
            label: 'Commercial Vehicles',
            options: ['Trucks', 'Vans', 'Buses', 'Trailers', 'Taxis'],
        },
        {
            label: 'Furniture',
            options: ['Sofas', 'Tables', 'Chairs', 'Beds', 'Cabinets'],
        },
        {
            label: 'Fashion',
            options: ['Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry'],
        },
        {
            label: 'Sports',
            options: ['Football', 'Basketball', 'Tennis', 'Cricket', 'Golf'],
        },
        {
            label: 'Education',
            options: ['Tutoring', 'Online Courses', 'School Supplies', 'Language Learning', 'Exam Preparation'],
        },
        {
            label: 'Services (Catering)',
            options: ['Wedding Catering', 'Event Catering', 'Corporate Catering', 'Private Chef', 'Food Delivery'],
        },
        {
            label: 'Others',
            options: ['Miscellaneous', 'Uncategorized', 'Random'],
        },
    ];



    const handlePriceChange = (event) => {
        setPrice(event.target.value);   


    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setSubcategory('');
    };

    const handleSubcategoryChange = (event) => {
        setSubcategory(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const CircularProgressWithLabel = ({ value }) => (
        <Backdrop
            open={true}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(173, 216, 230, 0.8)', // Light blue background color
            }}
        >
            <CircularProgress color="inherit" />
            <Typography variant="body2" color="blue" sx={{ ml: 2 }}>
                {`${Math.round(value)}%`}
            </Typography>
        </Backdrop>
    );
    const handlePostNowClick = async () => {
        try {
            setIsUploading(true);
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const formData = new FormData();
            formData.append('file', photo);
            formData.append('upload_preset', "product");
            formData.append('cloud_name', "dnjh6odhb") // Replace 'YOUR_UPLOAD_PRESET' with your Cloudinary upload preset value

            const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/dnjh6odhb/image/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                },
            });

            if (uploadResponse.data && uploadResponse.data.secure_url) {
                setPhotoUrl(uploadResponse.data.secure_url);

            } else {
                console.error('Error uploading photo:', uploadResponse.data);
                return; // Handle the error condition properly

            }

            const listingData = {
                category,
                subcategory,
                title,
                description,
                location,
                mobileNumber,
                photoUrl: uploadResponse.data.secure_url,
                price, // Add the price field here
            };
            const response = await axios.post('http://localhost:4000/api/listing/listings', listingData, { headers });

            console.log('Post successful:', response.data);
            console.log("phostourl", photoUrl);
            setIsUploading(false); // Upload completed, hide the circular progress
            setSnackbarOpen(true);
            setIslisting(true);
            setTimeout(() => {
                setSnackbarOpen(false);
                // Perform any other actions or redirects after successful posting
                // For example, you can navigate to the home page
                navigate('/');
            }, 3000);


            // ...
        } catch (error) {
            console.error('Error posting:', error.message);
            // ...
            setIsUploading(false); // Set isUploading to false when the post fails
            setSnackbarOpen(true); // Show the error Snackbar

            setTimeout(() => {
                setSnackbarOpen(false);
            }, 3000);
        }
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Post Page
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Select
                        value={category}
                        variant="outlined"
                        fullWidth
                        displayEmpty
                        onChange={handleCategoryChange}
                        renderValue={(value) => (value === '' ? 'Select Category' : value)}
                    >
                        <MenuItem value="" disabled>
                            <em>Select Category</em>
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem value={cat.label} key={cat.label}>
                                {cat.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Select
                        value={subcategory}
                        variant="outlined"
                        fullWidth
                        displayEmpty
                        onChange={handleSubcategoryChange}
                        renderValue={(value) => (value === '' ? 'Select Subcategory' : value)}
                        disabled={!category}
                    >
                        <MenuItem value="" disabled>
                            <em>Select Subcategory</em>
                        </MenuItem>
                        {categories
                            .find((cat) => cat.label === category)
                            ?.options.map((option) => (
                                <MenuItem value={option} key={option}>
                                    {option}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price (e.g., $10 per day) /$2000"
                        variant="outlined"
                        fullWidth
                        value={price}               // Add this line to set the value of the Price input field
                        onChange={handlePriceChange} // Add this line to handle changes in the Price input field
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        value={location}
                        onChange={handleLocationChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        value={mobileNumber}
                        onChange={handleMobileNumberChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FileInputButton>
                        <input type="file" onChange={handlePhotoChange} />
                        Choose File <UploadOutlinedIcon sx={{ marginLeft: '8px', fontSize: 20 }} />
                    </FileInputButton>
                    {photo && <img src={URL.createObjectURL(photo)} alt="Selected" width={200} height={200} />}
                </Grid>


                {/* <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handlePostNowClick}>
                        Post Now
                    </Button>
                </Grid> */}
            </Grid>
            {isUploading ? ( // Show the CircularProgress while uploading
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <CircularProgressWithLabel value={uploadProgress} />

                </Grid>
            ) : (
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handlePostNowClick}>
                        Post Now
                    </Button>
                </Grid>
            )}

        </Container >
    );
};

export default PostPage;


