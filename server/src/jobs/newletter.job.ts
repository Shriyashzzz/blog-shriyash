import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";
//this is where you add your jobs in the queue
// -----example--------------
//  await myQueue.add('myJobName', { foo: 'bar' });
//   await myQueue.add('myJobName', { qux: 'baz' });
// --------example-----------

//make the new queue on the redis
const EmailjobQueue = new Queue("newsletter-queue", {
  connection: redisConnection,
});

EmailjobQueue.on("error", (err) => console.error("Queue error:", err));

export { EmailjobQueue };
