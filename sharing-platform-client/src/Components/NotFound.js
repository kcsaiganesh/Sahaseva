import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NotFoundIllustration from '../assets/NotFound.png';
import { ErrorOutline } from '@mui/icons-material';

const PageNotFound = () => {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            <ErrorOutline sx={{ fontSize: '6rem', color: 'error.main' }} />
            <Typography variant="h4" component="h1" sx={{ mt: 4 }}>
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                We couldn't find the page you're looking for.
            </Typography>
            <img src={NotFoundIllustration} alt="Page Not Found" style={{ marginTop: '2rem', width: '500px', height: 'auto', display: 'block', margin: '0 auto' }} />

            <Button variant="contained" color="primary" component={Link} to="/">
                Go back to Home
            </Button>
        </Container>
    );
};

export default PageNotFound;
