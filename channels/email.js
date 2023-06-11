import nodemailer from 'nodemailer';
import { utils } from '../tools/utils.js';
import Config from '../config.js';

export const email = {
  validate(parms) {
    utils.log(`➡️  Validating...`);

    const { SEND_EMAIL_ADDRESS, SEND_EMAIL_PASSWORD } = process.env;
    if (!SEND_EMAIL_ADDRESS || !SEND_EMAIL_PASSWORD) {
      throw new Error(
        'SEND_EMAIL_ADDRESS and SEND_EMAIL_PASSWORD are required when using email channel'
      );
    }
  },
  async send({ text, html }) {
    const transporter = nodemailer.createTransport({
      host: Config.EMAIL.HOST || 'smtp.gmail.com',
      port: Config.EMAIL.PORT || 465,
      secure: Config.EMAIL.SECURE,
      auth: {
        user: process.env.SEND_EMAIL_ADDRESS,
        pass: process.env.SEND_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Pulse Monitor" <${process.env.SEND_EMAIL_ADDRESS}>`,
      to: Config.EMAIL.to || process.env.SEND_EMAIL_ADDRESS,
      subject: Config.EMAIL.SUBJECT || 'Pulse Monitor Alert',
      text,
      html,
    });
  },
};
