// src/components/OAuth2Callback.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const OAuth2Callback = () => {

    const navigate = Navigate();
    useEffect(() => {
        // Get the authorization code from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');

        // If there's no authorization code, redirect the user to a login page or display an error message
        if (!authorizationCode) {
            navigate('/login'); // Replace '/login' with the appropriate route to your login page
            return;
        }

        // Make a POST request to your backend /oauth2callback endpoint to exchange the code for access token and refresh token
        const data = { code: authorizationCode };
        fetch('http://localhost:4000/api/oauth2callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                // You can handle the response from the backend here (e.g., set user login state)
                console.log('OAuth2 Callback Response:', data);
                navigate('/'); // Redirect the user back to the main page
            })
            .catch(error => {
                console.error('Error exchanging authorization code:', error);
                // Handle errors (e.g., display an error message to the user)
                navigate('/login'); // Redirect the user to the login page if there's an error
            });
    });

    return <div>Handling OAuth2 callback...</div>;
};

export default OAuth2Callback;
