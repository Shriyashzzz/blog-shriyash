import config from "../config/config.js";
import { transporter } from "../config/smtp.config.js";

export const sendNewsLetterToSubscribers = async (
  subject: string,
  html: string,
  to: Array<string>,
) => {
  const mailOptions = {
    from: config.FROM_EMAIL,
    to: to,
    subject: subject,
    html: html,
  };

  return await transporter.sendMail(mailOptions);
};
