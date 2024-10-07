import nodemailer from 'nodemailer';
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

interface MailOptions {
  to: string;
  subject: string;
  text: string;
}

// Function to send email
const sendMail = async (code: MailOptions): Promise<nodemailer.SentMessageInfo> => {
  const info = await transporter.sendMail({
    from: '"Admin" <lequan18042001@gmail.com>',
    to: code.to,
    subject: code.subject,
    text: code.text,
  });
  return info;
};

export { sendMail };
