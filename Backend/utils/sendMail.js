import nodemailer from "nodemailer";
import dotenv from "dotenv";
//! Load dotenv into process object
dotenv.config();

//!Create a transport object
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

const sendEmail = async (to, otp) => {
  try {
    
    //! create the message to be sent
    const message = {
      from:process.env.USER_EMAIL,
      to:to,
      subject: "Reset Your Password",
      html: `<P>Your OTP for Password Reset is <b>${otp}</b>.
                It expires in 5 minutes.</P>`,
    };
    //! send the mail
    const info = await transport.sendMail(message);
    console.log(`Email send ${info.messageId}`);
  } catch (error) {
    console.log(error);
    throw new Error("Email Sending Failed ");
  }
};

export default sendEmail;
