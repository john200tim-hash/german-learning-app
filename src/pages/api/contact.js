// src/pages/api/contact.js

import nodemailer from 'nodemailer';

/**
 * API Route to handle contact form submissions.
 */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { senderEmail, message } = req.body;

    if (!senderEmail || !message) {
      return res.status(400).json({ error: 'Email and message are required.' });
    }

    // Configure the email transporter using your Gmail account
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: `"${senderEmail}" <${process.env.EMAIL_SERVER_USER}>`, // Use your server email as the sender for authentication
        to: 'john200tim@gmail.com', // The destination email address
        subject: `Message from ${senderEmail} via German Learning App`,
        text: message,
        replyTo: senderEmail, // Set the user's email as the reply-to address
      });

      res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ error: 'Failed to send message.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}