import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";
//this is where you add your jobs in the queue
// -----example-----
//  await myQueue.add('myJobName', { foo: 'bar' });
//   await myQueue.add('myJobName', { qux: 'baz' });
// --------example-----

const jobQueue = new Queue("newsletter-queue", { connection: redisConnection });

jobQueue.on("error", (err) => console.error("Queue error:", err));

export { jobQueue };
