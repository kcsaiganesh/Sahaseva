import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, EditOutlined } from '@mui/icons-material';

const PersonalProfile = () => {
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

    useEffect(() => {
        // Fetch user details from the backend on component mount
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/profile/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setUserProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleInputChange = (event) => {
        setUserProfile({
            ...userProfile,
            [event.target.name]: event.target.value,
        });
    };

    const handleEditProfile = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            await axios.put('http://localhost:4000/api/profile/profilecreation', userProfile, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // If edit is successful, fetch the updated user profile again
            fetchUserProfile();
            setIsSuccessDialogOpen(true);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setIsErrorDialogOpen(true);
        }
    };
    return (
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container className="py-5 h-100">
                <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                    <Grid item lg={6} className="mb-4 mb-lg-0">
                        <Card sx={{ borderRadius: '0.5rem', marginBottom: '2rem', height: '100%' }}>
                            <Grid container>
                                <Grid item md={4} sx={{ backgroundColor: (theme) => theme.palette.primary.main, borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', color: '#fff', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem 0' }}>
                                    <div>
                                        <CardMedia
                                            component="img"
                                            src={userProfile.photourl}
                                            alt="Avatar"
                                            sx={{ width: '80px', borderRadius: '50%', margin: 'auto' }}
                                        />
                                        <Typography variant="h6">{userProfile.name}</Typography>
                                        <Typography variant="subtitle1">{userProfile.skill}</Typography>
                                    </div>
                                    {!isEditing ? (
                                        <IconButton size="large" onClick={() => setIsEditing(true)} sx={{ color: '#fff', marginBottom: '1rem' }}>
                                            <EditOutlined />
                                        </IconButton>
                                    ) : (
                                        <IconButton size="large" onClick={handleEditProfile} sx={{ color: '#fff', marginBottom: '1rem' }}>
                                            Save
                                        </IconButton>
                                    )}
                                </Grid>
                                <Grid item md={8}>
                                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Information</Typography>
                                            <hr sx={{ mt: 0, mb: 4 }} />
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" >Email</Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{userProfile.email}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2">Phone</Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{userProfile.phone}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography variant="h6">Social Media</Typography>
                                            <hr sx={{ mt: 0, mb: 4 }} />
                                            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'start' }}>
                                                <Grid item>
                                                    <a href="#!">
                                                        <Facebook fontSize="large" sx={{ color: (theme) => theme.palette.info.main, marginRight: '1rem' }} />
                                                    </a>
                                                </Grid>
                                                <Grid item>
                                                    <a href="#!">
                                                        <Twitter fontSize="large" sx={{ color: (theme) => theme.palette.info.main, marginRight: '1rem' }} />
                                                    </a>
                                                </Grid>
                                                <Grid item>
                                                    <a href="#!">
                                                        <Instagram fontSize="large" sx={{ color: (theme) => theme.palette.info.main }} />
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Typography variant="body1" align="center" fontSize={10} style={{ color: 'orange' }} sx={{ m: 6 }}>
                                            * To ensure smooth communication and successful deals, please provide accurate information. *
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Dialog open={isSuccessDialogOpen} onClose={() => setIsSuccessDialogOpen(false)}>
                <DialogTitle>Profile Updated</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Your profile has been updated successfully.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSuccessDialogOpen(false)} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isErrorDialogOpen} onClose={() => setIsErrorDialogOpen(false)}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">An error occurred while updating your profile. Please try again later.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsErrorDialogOpen(false)} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default PersonalProfile;
