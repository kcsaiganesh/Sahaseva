import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Avatar, Card, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Alert from '@mui/material/Alert';

const ProfileCreation = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        skills: '',
        photoUrl: '',
    });

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        // Redirect to the user's profile page after successful profile creation
        // You can implement this redirection based on your app's requirements
        // history.push('/profile');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePhotoChange = (event) => {
        setFormData({ ...formData, photo: event.target.files[0] });
    };
    const stringAvatar = (name) => {
        if (!name) {
            return {}; // Return an empty object if name is undefined or empty
        }

        const initials = name
            .split(' ')
            .map((part) => part[0])
            .join('');

        return {
            children: initials,
            sx: { bgcolor: '#1976d2' }, // You can customize the background color of the avatar
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { name, email, phone, skills, photo } = formData;

            const formDataToSend = new FormData();
            formDataToSend.append('file', photo);
            formDataToSend.append('upload_preset', "product");
            formDataToSend.append('cloud_name', "dnjh6odhb");

            const uploadResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/dnjh6odhb/image/upload',
                formDataToSend,
                {
                    onUploadProgress: (progressEvent) => {
                        <LinearProgress />
                        // Update the progress here if you want to show a loading bar
                    },
                }
            );

            if (uploadResponse.data && uploadResponse.data.secure_url) {
                setFormData((prevData) => ({ ...prevData, photoUrl: uploadResponse.data.secure_url }));

                // Now you can make the POST request to create the profile in your database
                const response = await axios.post(
                    'http://localhost:4000/api/profile/profilecreation',
                    {
                        name,
                        email,
                        phone,
                        skills,
                        photourl: uploadResponse.data.secure_url,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', // Add the content type header as required by your server
                        },
                    }
                );
                console.log(response.data);
                setIsDialogOpen(true);
                // Redirect to the user's profile page or another page after successful profile creation
                // You can implement this redirection based on your app's requirements
            } else {
                console.error('Error uploading photo:', uploadResponse.data);
                return; // Handle the error condition properly
            }
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };


    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom align="left" sx={{ fontWeight: 'bold', mt: 3 }}>
                Create Profile
            </Typography>
            <Card>
                <form onSubmit={handleSubmit} >
                    <Avatar alt="Profile Photo" {...stringAvatar(formData.name)} sx={{ width: 56, height: 56, m: 4 }} />
                    <label htmlFor="upload-photo" style={{ cursor: 'pointer' }} >
                        <AddAPhotoIcon fontSize="large" sx={{ ml: 4 }} />
                        <input type="file" accept="image/*" id="upload-photo" style={{ display: 'none' }} onChange={handlePhotoChange} />
                    </label>

                    <TextField
                        sx={{ m: 2 }}
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        sx={{ m: 2 }}
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField fullWidth label="Phone" name="phone" value={formData.phone} sx={{ m: 2 }} onChange={handleInputChange} margin="normal" />
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        label="Skills/Interest"
                        name="skills"
                        multiline
                        rows={4}
                        value={formData.skills}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                        Create Profile
                    </Button>
                    <Typography variant="body1" align="center" gutterBottom style={{ color: 'orange', marginTop: '1rem' }}>
                        * To ensure smooth communication and successful deals, please provide accurate information. *
                    </Typography>
                </form>

            </Card>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Profile Created Successfully!</DialogTitle>
                <DialogContent>
                    {/* You can add a success message or additional content here */}
                    <Typography>Your profile has been successfully created.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProfileCreation;
