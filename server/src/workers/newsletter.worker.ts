import {
  sendLetter,
  type NewsLetterPayload,
} from "../services/email.service.js";
import { redisConnection } from "../config/redis.js";
import { Worker } from "bullmq";
import { sendWelcomeEmail } from "../scripts/welcomeNewsletter.js";

const newsLetterWorker = new Worker(
  `newsletter-queue`, // name of the job this particular worker looks at
  async (job) => {
    console.log("[worker] got job", job.name, job.id);

    switch (job.name) {
      case "send-newsletter":
        await sendLetter({
          html: job.data.html,
          subject: job.data.subject,
          subscriberInfo: { email: job.data.email, token: job.data.token },
        });
        break;
      case "send-welcome-script": {
        const ok = await sendWelcomeEmail(job.data.email, job.data.token);
        if (!ok) throw new Error("Welcome email rejected");
        break;
      }
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  },
  {
    connection: redisConnection, // the redis Queue it's going to look, the redis queue will have multiple jobs, jobs can have different names
    concurrency: 7, // can do 7jobs concurrently
  },
);

newsLetterWorker.on("error", (err) => console.error("Worker error:", err));
newsLetterWorker.on("ready", () => console.log("Newletter Worker Ready"));
newsLetterWorker.on("failed", (job, err) =>
  console.error(`job ${job?.name} (${job?.id}) failed:`, err.message),
);
newsLetterWorker.on("completed", (job) =>
  console.log(`job ${job.name} (${job.id}) done`),
);
