import videoQueue from "../utils/queue";

const processVideo = async (
  videoPath: undefined | String,
  outputPath: String
) => {
  console.log("video path", videoPath, outputPath);
  await videoQueue.add({ videoPath, outputPath });
  // await videoQueue
  //   .add({ test: "data" })
  //   .then(() => console.log("Added to queue"));
};

export default processVideo;
