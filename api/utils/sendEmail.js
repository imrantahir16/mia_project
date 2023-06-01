const nodemailer = require("nodemailer");
// require("dotenv").config();

const sendConfirmationEmail = async (name, email, subject, link) => {
  const output = `
    <h1>Email Confirmation</h1>
    <h2>Hello ${name},</h2>
    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    <p>If you did not make this request please ignore it.</p>
    <a style="max-width: 800px" href=${link}>Click here</a>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: output,
    });

    console.log("Email sent sucessfully");
    return true;
  } catch (error) {
    console.log(error, "Email not sent");
    return false;
  }
};

const sendResetPasswordEmail = async (name, email, subject, link) => {
  const output = `
    <h1>Reset Password</h1>
    <h2>Hello ${name},</h2>
    <p>A request to reset the password for your account has been made</p>
    <p>If you did not make this request please ignore it.</p>
    <p>To reset your password use this link: <a style="max-width: 800px" href=${link}>Reset Password</a></p>
  `;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: output,
    });

    console.log("Email sent sucessfully");
    return true;
  } catch (error) {
    console.log(error, "Email not sent");
    return false;
  }
};

module.exports = { sendResetPasswordEmail, sendConfirmationEmail };
