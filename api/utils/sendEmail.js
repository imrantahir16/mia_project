const nodemailer = require("nodemailer");
// require("dotenv").config();

const sendEmail = async (name, email, subject, link) => {
  const output = `
    <p>Hello ${name},</p>
    <br>
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

    console.log("email sent sucessfully");
    return true;
  } catch (error) {
    console.log(error, "email not sent");
    return false;
  }
};

module.exports = sendEmail;
