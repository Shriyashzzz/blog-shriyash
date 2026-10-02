import { welcomeNewsletterTemplate } from "../templates/newsletter_welcome.template.js";
import config from "../config/config.js";
import { transporter } from "../config/smtp.config.js";

export async function sendWelcomeNewsLetterMessage(
  userToken: string,
  subscribers: Array<string>,
): Promise<boolean> {
  try {
    await sendWelcomeEmail(welcomeNewsletterTemplate(), subscribers, userToken);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const sendWelcomeEmail = async (
  html: string,
  to: Array<string>,
  token: string,
) => {
  const welcomeSubject = "Heya, Thanks for subscribing to my newsletter!";
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
    subject: welcomeSubject,
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

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    }
  });
};
