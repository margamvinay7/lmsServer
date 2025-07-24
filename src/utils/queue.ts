import { Queue } from "bullmq";

const redisConnection={ host: "127.0.0.1", port: 6379 }

let videoQueue: any;
try {
  videoQueue = new Queue("video-processing", {
    connection: redisConnection,
  });
} catch (err) {
  console.log("error in queue", err);
}

export default videoQueue;
