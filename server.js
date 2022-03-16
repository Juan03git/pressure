require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
  console.log(req.body);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: req.body.email,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };
  sgMail.send(mailOptions, (error, info) => {
    if (error) {
      console.log('error');
      console.log('error', error);
      res.send('error');
    } else {
      console.log('Email sent:' + info.response);
      res.send('success');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
