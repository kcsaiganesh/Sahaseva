import React from 'react';
import { styled } from '@mui/system';
import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from "framer-motion";
import resource from "../assets/resouce.png";
import skillsharing from "../assets/skillsharing.png";
import knowledge from "../assets/knwoledgesharing.png";


const StyledContainer = styled(Container)(({ theme }) => ({
    // Custom styles for Container

}));

const refreshPage = () => window.location.reload();


const StyledGrid = styled(Grid)(({ theme }) => ({
    // Custom styles for Grid
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    // Custom styles for Typography



}));



const Dashboard = () => {
    return (

        <>
            <StyledContainer>
                <StyledGrid container spacing={2} sx={{ height: 700 }}>
                    <Grid item xs={12}>
                        <StyledTypography variant="h2" fontWeight="bold" align="center" mb={3} color="#0d47a1" fontSize="3rem" fontFamily="Montserrat, sans-serif">
                            Welcome to the Community Sharing Economy Platform
                        </StyledTypography>
                        <StyledTypography variant="subtitle1" fontWeight="regular" color="#212121" align="center" mb={2}>
                            " A Community Sharing Economy Platform is a web application that allows individuals within a specific community to connect and share resources, services, and skills with each other. The platform promotes collaboration, sustainability, and reduces waste by facilitating the efficient utilization of available resources. Users can offer their underutilized items, lend tools or equipment, provide services, or share their expertise in various fields."
                        </StyledTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} >
                        <motion.div className="box"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }} initial="initial" animate="animate">
                            <Card color='#bbdefb'>
                                <CardMedia
                                    component="img"
                                    // height="140"
                                    // component="img"
                                    sx={{ width: 151 }}
                                    image={resource}
                                    alt="Card 1"
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Resource Sharing
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Share your underutilized items with others in your community. Whether it's tools, appliances, or other resources, you can contribute to reducing waste and promoting sustainability.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                        <motion.div className="box"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }} initial="initial" animate="animate">
                            <Card >
                                <CardMedia
                                    component="img"
                                    // height="140"
                                    image={skillsharing}
                                    sx={{ width: 151 }}
                                    alt="Card 2"
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Service Exchange
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Offer your services and skills to help others in your community. Whether it's gardening, tutoring, or any other expertise you have, you can connect with people who need your assistance.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} >
                        <motion.div className="box"
                            whileHover={{ scale: 1.2 }}
                            // whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }} initial="initial" animate="animate">
                            <Card >
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    // height="140"
                                    image={knowledge}
                                    alt="Card 3"
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Skill Sharing
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Share your expertise and knowledge with others. You can provide workshops, lessons, or consultations to help community members learn and grow in various fields.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                </StyledGrid>
            </StyledContainer >

        </>
    );
};

export default Dashboard;
