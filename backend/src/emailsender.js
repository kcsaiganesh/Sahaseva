const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Function to send emails using Nodemailer and OAuth2
const sendEmail = async (senderEmail, receiverEmail, subject, message) => {
    try {
        // Replace these values with your actual OAuth2 credentials and refresh token
        const CLIENT_ID = '705928849813-qritcsbaaltnkg6d82649tg2tha736d6.apps.googleusercontent.com';
        const CLIENT_SECRET = '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';
        const REDIRECT_URL = 'http://localhost:3000/oauth2callback';
        const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN'; // Get the refresh token from the OAuth2 flow

        // Configure your OAuth2 credentials
        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URL
        );

        // Set the refresh token
        oauth2Client.setCredentials({
            refresh_token: REFRESH_TOKEN,
        });

        // Generate an access token using the refresh token
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });

        // Create a Nodemailer transporter using the Gmail SMTP server and the access token
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: senderEmail,
                accessToken,
            },
        });

        // Compose the email
        const mailOptions = {
            from: senderEmail,
            to: receiverEmail,
            subject,
            text: message,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
