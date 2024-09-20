import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "lequan18042001@gmail.com",
    pass: "skxa cccp rslw iulg"
  },
});

interface MailOptions {
  to: string;
  subject: string;
  text: string;
}

// Function to send email
const sendMail = async (code: MailOptions): Promise<nodemailer.SentMessageInfo> => {
  console.log('code', code);
  const info = await transporter.sendMail({
    from: '"Admin" <lequan18042001@gmail.com>',
    to: code.to,
    subject: code.subject,
    text: code.text,
  });
  return info;
};

export { sendMail };
