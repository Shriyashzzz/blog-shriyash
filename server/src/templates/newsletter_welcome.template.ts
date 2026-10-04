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
  const safeName = escapeHtml((name && name.trim()) || "There");

  return `  
   <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #111827; line-height: 1.7; background-color: #e5e7eb;">
        <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: bold; color: #111827;">Hi there!</h1>
        <p><img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2l0Z2g2Ymh1NHdmYnZrMjBrY3Y4aDFlNnp2azRkNW5iZ3RrM2ZkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LR5GeZFCwDRcpG20PR/giphy.gif" alt="Chud Shrek" width="297" height="167" /></p>
        <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">Thanks for joining my <strong>newsletter</strong> ;) <br /><br /> My deal with you is <strong>simple</strong>: I'll send you high quality quick <strong>newsletters</strong> that you can read on the go that's all about fullstack-web/native development your way.</p>
        <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">That will not be limited to any curriculum but include all the extra stuff that I'll keep needing on my path of being equipped with tools demanded by the current Job market.</p>
        <div style="background-color: #f3f4f6; border-left: 4px solid #008000; padding: 16px 20px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 600; color: #111827;">What you can expect:</h3>
        <ul style="margin: 0; padding-left: 18px; color: #374151; font-size: 15px;">
        <li style="margin-bottom: 8px;"><strong style="color: #111827;">Technical Breakdowns:</strong> Clear, deep dives into front-end and back-end &amp; system design concepts.</li>
        <li style="margin-bottom: 8px;"><strong style="color: #111827;">Skill Level-Ups:</strong>&nbsp;Quick Reads about tools &amp; frameworks I learn to level up.</li>
        <li style="margin-bottom: 8px;"><strong style="color: #111827;">Job Market Reality:</strong> An unfiltered look at breaking into SWE as an undergrad that you can relate to.</li>
        </ul>
        </div>
        <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 600; color: #111827;">How this helps you:</h3>
        <p style="margin: 0 0 24px; font-size: 15px; color: #374151;">If you&rsquo;re working through <strong><em>The Odin Project</em></strong>,<strong> self-teaching software development</strong>, or navigating the post-bootcamp/degree dilemma, this newsletter is for you. Learn from my wins, steal my takeaways, and avoid my mistakes. I will share all of them with you. Bro to Bro. I want you to win.</p>
        <p style="margin: 0 0 24px; font-size: 15px; color: #374151;"><img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWxybmUxMGR1ZzRkYTIxZW80ZHBudGEybmFrYXV6d2Vpdnc2cDJydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dJnRozE0LjU6zTq10M/giphy.gif" alt="Bro love" width="207" height="207" /></p>
        <p style="margin: 0 0 24px; font-size: 15px; color: #374151;">&nbsp;See you next time.</p>
        <hr style="border: none; border-top: 1px solid #d1d5db; margin: 24px 0;" />
        <p style="margin: 0; font-size: 15px; color: #374151;">Cheers,<br /> <strong style="color: #008000;">Shriyash Ghimire</strong><br /> <span style="font-size: 13px; color: #6b7280;">Full-Stack Developer &amp; Creator of <em>Shriyash Uncompiled</em></span><br/> You can reply to my newsletters, I read every single email ;)</p>
</div>
  `;
};
