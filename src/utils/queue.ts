import Queue from "bull";

let videoQueue: any;
try {
  videoQueue = new Queue("video-processing1", {
    redis: { host: "127.0.0.1", port: 6380 },
  });
} catch (err) {
  console.log("error in queue", err);
}

export default videoQueue;
