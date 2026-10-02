import config from "../config/config.js";
import { transporter } from "../config/smtp.config.js";

export const sendNewsLetterToSubscribers = async (
  subject: string,
  html: string,
  to: Array<string>,
  token: string,
) => {
  const unsubscribeUrl = `${config.API_SERVER_URL}/api/newsletter/unsubscribe?token=${token}`;
  const body = `
        ${html}
        <hr />
        <p style="font-size:12px;color:#888;text-align:center;">
          Don't want these emails?
          <a href="${unsubscribeUrl}">Unsubscribe</a>
        </p>
      `;
  const mailOptions = {
    from: `Shriyash Ghimire ${config.FROM_EMAIL},`,
    to: to,
    subject: subject,
    html: body,
    list: {
      // List-Unsubscribe: <http://example.com> ( Unsubscribes from the newsletter through the email. )
      unsubscribe: {
        url: unsubscribeUrl,
        comment: "Unsubscribe from my newsletters :(",
      },
    },
    headers: {
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };

  return await transporter.sendMail(mailOptions);
};
