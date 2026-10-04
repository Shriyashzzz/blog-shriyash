import { sendLetter, type NewsLetterPayload } from "../services/email.service";
import { redisConnection } from "../config/redis";
import { Worker } from "bullmq";

const newsLetterWorker = new Worker(
  `newsletter-queue`,
  async (job) => {
    const currData = job.data;
    const dataPayload: NewsLetterPayload = {
      html: currData.html,
      subject: currData.subject,
      subscriberInfo: {
        email: currData.email,
        token: currData.token,
      },
    };
    await sendLetter(dataPayload);
  },
  {
    connection: redisConnection,
    concurrency: 7,
  },
);

newsLetterWorker.on("error", (err) => console.error("Worker error:", err));
newsLetterWorker.on("ready", () => console.log("Worker ready"));
