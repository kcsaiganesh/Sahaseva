import React from 'react';
import { Box, Container, Grid, Typography, ThemeProvider, Divider, Chip } from '@mui/material';
import { Facebook, Twitter, GitHub } from '@mui/icons-material';
import { useTheme } from '@emotion/react';

const theme = useTheme;


const Footer = () => {
    return (
        <ThemeProvider theme={theme}>

            <Container sx={{ mt: 36 }}>
                <Divider>
                    <Chip label="End" />
                </Divider>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" component="h6" fontWeight="bold" mb={4}>
                            SAHASEVA
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            The Community Sharing Economy Platform is a web application that connects individuals within a specific
                            community to share resources, services, and skills. Our platform promotes collaboration, sustainability,
                            and reduces waste by facilitating the efficient utilization of available resources. Users can offer their
                            underutilized items, lend tools or equipment, provide services, or share their expertise in various fields.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" component="h6" fontWeight="bold" mb={4}>
                            Connect with us
                        </Typography>
                        <Box display="flex" justifyContent="space-evenly" mb={4}>
                            <a href="#" className="me-4 text-reset">
                                <Facebook color="secondary" />
                            </a>
                            <a href="#" className="me-4 text-reset">
                                <Twitter color="secondary" />
                            </a>
                            <a href="https://github.com/LifeSavingService" className="me-4 text-reset">
                                <GitHub color="secondary" />
                            </a>

                        </Box>
                        <Typography variant="body2" color="textSecondary" ml="3">
                            © {new Date().getFullYear()} Lss. All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider >
    );
};

export default Footer;
