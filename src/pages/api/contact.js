// src/pages/api/contact.js

import sgMail from '@sendgrid/mail';

/**
 * API Route to handle contact form submissions.
 */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { senderEmail, message } = req.body;

    if (!senderEmail || !message) {
      return res.status(400).json({ error: 'Email and message are required.' });
    }

    // Set SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
      // Send the email
      const msg = {
        to: 'john200tim@gmail.com', // The destination email address
        from: process.env.EMAIL_SERVER_USER, // Your verified SendGrid sender email (e.g., john200tim@gmail.com)
        to: 'john200tim@gmail.com', // The destination email address
        subject: `Message from ${senderEmail} via German Learning App`,
        text: `From: ${senderEmail}\n\n${message}`,
        html: `<strong>From:</strong> ${senderEmail}<br><br>${message.replace(/\n/g, '<br>')}`,
        replyTo: senderEmail,
      };
      await sgMail.send(msg);

      res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ error: 'Failed to send message.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}