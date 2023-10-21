import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, CircularProgress, Divider, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Rating, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ReactStringReplace from 'react-string-replace';
import axios from 'axios';

const ProductDetailPage = () => {
    const Token = localStorage.getItem('token');
    console.log("token", Token);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [ptitle, setPtitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]); // State to track loading state
    const [buyerMessage, setBuyerMessage] = useState('');
    const [openContactDialog, setOpenContactDialog] = useState(false);
    const [sellerEmail, setSellerEmail] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('buyer_email@example.com');
    // New state variables for review feature
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState('');
    const productId = id;// Replace with the actual buyer's email
    console.log(productId);
    useEffect(() => {
        fetchProduct();
        fetchBuyerEmail();
        fetchAllReviews();
        console.log('Updated Product Title:', ptitle);
        console.log('Updated seller Email', sellerEmail);// Add this line to fetch the buyer's email
    }, [ptitle, sellerEmail]);


    const formatDescription = (text) => {
        // Split the text into paragraphs using two line breaks as the separator
        return text.split('\n\n').map((paragraph, index) => (
            <React.Fragment key={index}>
                {paragraph}
                <br />
                <br />
            </React.Fragment>
        ));
    };
    const calculateAverageRating = () => {
        if (!product || !product.ratings || product.ratings.length === 0) {
            return 0;
        }
        const sum = product.ratings.reduce((acc, rating) => acc + rating, 0);
        return sum / product.ratings.length;
    };
    const averageRating = calculateAverageRating();
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/listing/listings/${id}`);
            const productData = response.data;
            const title = productData.title;
            setPtitle(title);
            setProduct(response.data);
            setLoading(false);

            // Assuming product data contains the user ID of the seller
            const sellerUserId = response.data.userId;
            fetchSellerProfile(sellerUserId);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);
        }
    };
    console.log(product);

    const fetchSellerProfile = async (sellerUserId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/profile/profile/${sellerUserId}`, {
                headers: {
                    Authorization: `Bearer ${Token}`, // Include the token in the Authorization header
                }
            });
            setSellerEmail(response.data.email);
            console.log("seller Email", sellerEmail);
        } catch (error) {
            console.error('Error fetching seller email:', error);
        }
    };
    console.log(sellerEmail);

    const handleReviewSubmit = async () => {
        try {
            // Here, you can send the review data (userRating and userReview) to the backend
            // and update the product's ratings array accordingly.
            // For simplicity, I'll just log the data for now.
            await axios.post(`http://localhost:4000/api/reviews/review/${id}`, {
                rating: userRating,
                review: userReview,
            });
            console.log('User Rating:', userRating);
            console.log('User Review:', userReview);

            // After submitting the review, you may want to update the product data to reflect the new review.
            // For example, refetch the product data from the server.
            // For now, we'll just clear the userRating and userReview state variables.
            setUserRating(0);
            setUserReview('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };
    const fetchAllReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/reviews/allreviews/${id}`);

            setReviews(response.data.reviews);
            setUserRating(response.data.rating);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const fetchBuyerEmail = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/profile/currentuser', {
                headers: {
                    Authorization: `Bearer ${Token}`, // Include the token in the Authorization header
                },
            });
            setBuyerEmail(response.data.email);
            console.log(buyerEmail);
        } catch (error) {
            console.error('Error fetching buyer email:', error);
        }
    };
    const handleOpenContactDialog = () => {
        setOpenContactDialog(true);
    };

    const handleCloseContactDialog = () => {
        setOpenContactDialog(false);
    };


    const handleContactSeller = async () => {
        try {

            // Use the buyerEmail state variable to send the message
            const response = await axios.post('http://localhost:4000/api/contactseller/sendmessage', {
                productId: productId,
                ptitle: ptitle,
                buyerEmail: buyerEmail,
                sellerEmail: sellerEmail,
                buyerMessage: buyerMessage,
            });

            // Handle the response from the server (optional)
            console.log(response.data.message);

            // Close the contact dialog after submitting the message
            setOpenContactDialog(false);
            setBuyerMessage('');
        } catch (error) {
            console.error('Error contacting seller:', error);
        }
    };


    if (loading) {
        return (
            <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={80} />
            </Container>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const { title, photoUrl, price, description, category, location } = product;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Product Images */}
            <Grid container spacing={2} justifyContent="center"> {/* Center the images */}
                {photoUrl.map((photo, index) => (
                    <Grid item key={index}>
                        <motion.img
                            src={photo}
                            alt={title}
                            style={{ maxWidth: '80%', height: 'auto', borderRadius: '8px' }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </Grid>
                ))}
            </Grid>
            {/* <Divider variant="middle" /> */}

            {/* Product Details */}
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="Subtitle" >
                                Category: {category}
                            </Typography>

                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" textAlign="right">
                                <LocationOnIcon />Location : {location}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Divider />

            {/* Price Card */}
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6" >   <CurrencyRupeeIcon />Price</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        ₹ {price}
                    </Typography>
                </CardContent>
            </Card>
            <Divider />
            {/* Description */}
            {description && (
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h6"><DescriptionIcon /> Description</Typography>
                        <Typography variant="body1">
                            {formatDescription(description)}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            <Divider />

            <Divider />

            {/* Contact Seller Button */}
            <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => setOpenContactDialog(true)}>
                Contact Seller
            </Button>

            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6">Write a Review</Typography>
                    <Rating
                        name="user-rating"
                        value={userRating}
                        precision={0.5}
                        onChange={(event, newValue) => setUserRating(newValue)}
                    />
                    <TextField
                        label="Your Review"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleReviewSubmit} sx={{ mt: 2 }}>
                        Submit Review
                    </Button>
                </CardContent>
            </Card>
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Avatar sx={{ marginBottom: 2 }} />
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>Reviews</Typography>
                    {reviews.map((review, index) => (
                        <div key={index}>

                            <Typography variant="body1">Rating: {review.rating}</Typography>
                            <Typography variant="body2">comment: {review.review}</Typography>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Divider />

            {/* Contact Seller Dialog */}
            <Dialog open={openContactDialog} onClose={handleCloseContactDialog} fullWidth maxWidth="sm">
                <DialogTitle>Contact Seller</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Your Message"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={buyerMessage}
                        onChange={(e) => setBuyerMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', width: '100%', padding: 2 }}>
                    <Button onClick={handleCloseContactDialog} color="inherit">
                        Cancel
                    </Button>
                    <Button sx={{ marginLeft: 4 }} onClick={handleContactSeller} color="primary">
                        <ContactMailIcon style={{ margin: '5px' }} />  Send Message
                    </Button>
                </DialogActions>
            </Dialog>
        </Container >
    );
};

export default ProductDetailPage;
