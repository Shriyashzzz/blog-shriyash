import { welcomeNewsletterTemplate } from "../templates/newsletter_welcome.template.js";
import config from "../config/config.js";
import { transporter } from "../config/smtp.config.js";

export const sendWelcomeEmail = async (to: string, token: string) => {
  const unsubscribeUrl = `${config.API_SERVER_URL}/api/newsletter/unsubscribe?token=${token}`;

  const info = await transporter.sendMail({
    from: `"Shriyash Ghimire" <${config.FROM_EMAIL}>`,
    to,
    subject: "Heya, Thanks for subscribing to my newsletter!",
    html: `
      ${welcomeNewsletterTemplate()}
      <hr />
      <p style="font-size:12px;color:#888;text-align:center;">
        Don't want these emails?
        <a href="${unsubscribeUrl}">Unsubscribe</a>
      </p>`,
    list: {
      unsubscribe: {
        url: unsubscribeUrl,
        comment: "Unsubscribe from my newsletters",
      },
    },
    headers: { "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  });

  if (info.rejected.length > 0) {
    return false;
  }
  return true;
};
