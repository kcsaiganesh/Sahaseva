import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';



const SuccessContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
});

const SuccessCard = styled(Card)({
    padding: '24px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Light blue shadow
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const CircleIcon = styled(motion.div)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    backgroundColor: '#a6f1a6', // Light green color
    marginBottom: '16px',
});

const SuccessPage = () => {
    return (
        <SuccessContainer>
            <SuccessCard>
                <CircleIcon
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <DoneOutlineRoundedIcon fontSize="large" color="primary" />
                </CircleIcon>
                {/* <SuccessImage src={done} alt="Success" style={{ width: '200px', marginBottom: '16px' }} /> */}
                <Typography variant="h4" gutterBottom>
                    Success! Your Listing has been posted.
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontSize: '16px', color: '#666', maxWidth: '400px' }}>
                    Your Listing/offer has been successfully posted. Potential buyers will be able to see your listing.
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontSize: '16px', color: '#666', maxWidth: '400px' }}>
                    <Link to="/" style={{ color: '#00C853', textDecoration: 'underline' }}>
                        Go to Home Page
                    </Link>
                </Typography>
            </SuccessCard>
        </SuccessContainer>
    );
};

export default SuccessPage;
