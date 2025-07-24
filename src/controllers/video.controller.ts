import { Request, Response } from "express";
import processVideo from "../services/video.service";

const uploadVideo = async (req: Request, res: Response) => {
  try {
    const videoPath = req.file?.path;
    const outputPath = `./uploads/courses/${req.file?.filename}`;
    console.log("running in controller");

    await processVideo(videoPath, outputPath);

    res.status(200).json({ message: "Video uploaded and processing started!" });
  } catch (err: Error | any) {
    console.log("error here", err);
    res
      .status(500)
      .json({ message: "Error uploading video", error: err?.message });
  }
};

export default uploadVideo;
