const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/sendmessage', async (req, res) => {
    try {
        const { productId, ptitle, buyerEmail, sellerEmail, buyerMessage } = req.body;
        if (productId || ptitle || buyerEmail || sellerEmail || buyerMessage == null) {
            console.log("No valid request : ________________");
        }
        console.log(req.body);

        // Your Nodemailer setup (replace with your own email account details)
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'kcsaiganesh@gmail.com',
                pass: 'lzko nsqx rncp hmlc',
            },
        });


        const mailOptions = {
            from: `"SAHASEVA" <noreply@sahaseva.com>`,
            to: sellerEmail,
            subject: `Regarding Product ${productId} - ${ptitle}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px;">
                <img src="https://res.cloudinary.com/dnjh6odhb/image/upload/v1690994120/ioiaqntpyg5appgsro1a.png" alt="SAHASEVA Logo" style="max-width: 200px;">
                <h2>Regarding Product ${productId} - ${ptitle}</h2>
                <p style="font-size: 16px;">Message from ${buyerEmail}:</p>
                <p style="font-size: 14px; border: 1px solid #ccc; padding: 10px; border-radius: 8px;">${buyerMessage}</p>
            </div>
            <p style="font-size: 12px; color: #777;">This email was sent from SAHASEVA. Please do not reply to this email.</p>
        </div>
    `,
        };



        // Send the email using Nodemailer
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send the email.' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent successfully.' });
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
