const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const welcomeNewsletterTemplate = (
  name?: string | undefined,
): string => {
  const safeName = escapeHtml((name && name.trim()) || "there");

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #222; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">Hi, ${safeName} 👋</h2>

      <p style="margin: 0 0 16px;">
        Thanks for subscribing to my newsletter! I promise not to send you unnecessary spam.
        That's the deal between you and me, and I intend to honor it.
      </p>

      <h3 style="margin: 24px 0 8px;">What can you expect?</h3>
      <p style="margin: 0 0 8px;">
        As I wrap up The Odin Project and move on to what comes next, you'll get:
      </p>
      <ul style="margin: 0 0 16px; padding-left: 20px;">
        <li style="margin-bottom: 8px;">High-quality technical breakdowns of front-end and back-end topics</li>
        <li style="margin-bottom: 8px;">The topics and steps I take to level up my SWE skills. Right now that's Redis, so expect a post on it soon</li>
        <li style="margin-bottom: 8px;">An honest look at how the job market treats an undergrad trying to break into the field</li>
        <li style="margin-bottom: 8px;">The occasional tomfoolery</li>
      </ul>

      <h3 style="margin: 24px 0 8px;">How will that help you?</h3>
      <p style="margin: 0 0 16px;">
        If you're doing The Odin Project, thinking about it, or teaching yourself by any other route,
        you'll see the challenges I run into and the dilemmas I face about what to pursue after finishing the course.
        Hopefully you can learn from both my mistakes and my wins.
      </p>

      <p style="margin: 24px 0 0;">
        Regards,<br />
        Shriyash
      </p>
    </div>
  `;
};
