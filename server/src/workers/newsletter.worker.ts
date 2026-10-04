import { sendLetter, type NewsLetterPayload } from "../services/email.service";
import { redisConnection } from "../config/redis";
import { Worker } from "bullmq";

const newsLetterWorker = new Worker(
  `newsletter-queue`, // name of the job this particular worker looks at
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
    connection: redisConnection, // the redis Queue it's going to look, the redis queue will have multiple jobs, jobs can have different names
    concurrency: 7, // can do 7 jobs concurrently
  },
);

newsLetterWorker.on("error", (err) => console.error("Worker error:", err));
newsLetterWorker.on("ready", () => console.log("Newletter Worker Ready"));
