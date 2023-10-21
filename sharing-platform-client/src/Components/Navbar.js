import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@mui/material';
import { ExitToApp, PersonAdd, Login, Home, ListAlt, AccountCircle, AddBox } from '@mui/icons-material';
import { motion } from 'framer-motion';
import logo from '../assets/logo-no-background.png';

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Check if the user is logged in using localStorage on component mount
    useEffect(() => {
        const userLoggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(userLoggedIn === 'true');
    }, []);

    // Function to handle user login
    const handleLogin = () => {
        const loged = localStorage.getItem('isLoggedIn');
        if (loged === true) {
            setIsLoggedIn(true);

        }
    };

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return isLoggedIn ? (
        // If the user is logged in, show authenticated navbar
        <AppBar position="fixed">
            <Toolbar>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '15px' }} />
                </motion.div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

                <Button component={Link} to="/" color="inherit" startIcon={<Home />}>
                    Home
                </Button>

                <Button
                    component={Link}
                    to="/shophome"
                    color="inherit"
                    startIcon={<ListAlt />}
                    sx={{ '&:hover': { borderBottom: '2px solid #3f51b5' } }}
                >
                    Listings
                </Button>

                <Button
                    component={Link}
                    to="/profilecreation"
                    color="inherit"
                    startIcon={<AddBox />}
                    sx={{ '&:hover': { borderBottom: '2px solid #3f51b5' } }}
                >
                    Create Profile
                </Button>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}

                >
                    <IconButton component={Link} to="/profile" color="inherit">
                        <Avatar alt="User Avatar" src="path_to_avatar" />
                    </IconButton>
                </motion.div>
                <IconButton color="inherit" onClick={handleLogout}>
                    <ExitToApp />
                </IconButton>
            </Toolbar>
        </AppBar>
    ) : (
        // If the user is not logged in, show unauthenticated navbar
        <AppBar position="fixed">
            <Toolbar>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '15px' }} />
                </motion.div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

                <Button component={Link} to="/" color="inherit" startIcon={<Home />}>
                    Home
                </Button>

                <Button
                    component={Link}
                    to="/register"
                    color="inherit"
                    startIcon={<PersonAdd />}
                    sx={{ '&:hover': { borderBottom: '2px solid #3f51b5' } }}
                >
                    Register
                </Button>
                <Button
                    component={Link}
                    to="/login"
                    color="inherit"
                    onClick={handleLogin}
                    startIcon={<Login />}
                    sx={{ '&:hover': { borderBottom: '2px solid #3f51b5' } }}
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
