const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const { url } = require('@r/utils/helpers');
const logger = require('@r/utils/logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ to, subject, template, data = {} }) => {
  const templatePath = path.join(__dirname, `../views/emails/${template}`);
  data.logoUrl = url('/images/logo.png');
  const html = await ejs.renderFile(templatePath, data);
  const from = process.env.SMTP_FROM;

  return await transporter.sendMail({ to, subject, html, from });
};

module.exports = {
  transporter,
  sendMail,
};
