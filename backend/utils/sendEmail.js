import nodemailer from 'nodemailer';

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  
  },
});

// Function to send email
const sendEmail = (emails, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails,
    subject: 'Thank You for Your Order at MeerutMart.com',
    text: message || "Your Order has been successfully placed", 
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
};

export default sendEmail;

