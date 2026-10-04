//make generic pure email sender function for newsletters
// What will I need to implement it?
//redis queue to keep track of emails that i sent.
//an worker function to send emails. To ensure it does not block my Api
import config from "../config/config";
import { transporter } from "../config/smtp.config";

export interface NewsLetterPayload {
  html: string;
  subject: string;
  subscriberInfo: { email: string; token: string };
}

export async function sendLetter({
  html,
  subject,
  subscriberInfo,
}: NewsLetterPayload) {
  const unsubscribeUrl = `${config.API_SERVER_URL}/api/newsletter/unsubscribe?token=${subscriberInfo.token}`;
  const info = await transporter.sendMail({
    from: `"Shriyash Ghimire" <${config.FROM_EMAIL}>`,
    to: subscriberInfo.email,
    subject: subject,
    html: `
      ${html}
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

  if (info.rejected) {
    throw new Error(
      `Error sending the newsletter to this reciptiant: ${subscriberInfo}`,
    );
  }
}

//an retry function if sendLetter get's stuck or only finished halfway
