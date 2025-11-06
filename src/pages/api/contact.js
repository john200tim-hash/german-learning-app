// src/pages/api/contact.js

/**
 * API Route to handle contact form submissions.
 * In a real application, this would integrate with an email service (e.g., Nodemailer).
 */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { senderEmail, message } = req.body;

    if (!senderEmail || !message) {
      return res.status(400).json({ error: 'Email and message are required.' });
    }

    // --- In a real application, you would send the email here ---
    // Example using Nodemailer (requires installation and configuration):
    // await sendEmail({ to: 'john200tim@gmail.com', from: senderEmail, subject: 'Contact Form Submission', text: message });

    console.log(`Contact form submission from: ${senderEmail}`);
    console.log(`Message: ${message}`);

    res.status(200).json({ success: true, message: 'Message received successfully!' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}