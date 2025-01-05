import express, { Express } from "express";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import path from "path";

import videoQueue from "../utils/queue";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const app: Express = express();

videoQueue.process(async (job: any) => {
  console.log("job data", job);
  const { videoPath, outputPath } = job.data;

  console.log("worker running", videoPath, outputPath);
  let masterPlaylistPath = `${outputPath}/master.m3u8`;

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  return new Promise<void>((resolve, reject) => {
    const resolutions = [
      { resolution: "360p", width: 640, height: 360 },
      { resolution: "480p", width: 854, height: 480 },
      // { resolution: "2k", width: 3840, height: 2160 },
    ];

    let masterPlaylsitContent = "";
    let completed = 0;

    resolutions.forEach((res) => {
      const resolutionDir = path.join(outputPath, res.resolution);
      if (!fs.existsSync(resolutionDir)) {
        fs.mkdirSync(resolutionDir, { recursive: true });
      }

      ffmpeg(videoPath)
        .outputOptions([
          `-vf scale=${res.width}:${res.height}`,
          `-hls_time 10`,
          `-hls_list_size 0`,
          `-hls_segment_filename ${resolutionDir}/segment_%03d.ts`,
          `-hls_playlist_type vod`,
          `-c:v libx264`,
          `-c:a aac`,
          `-strict -2`,
        ])
        .output(`${resolutionDir}/index.m3u8`)
        .on("end", () => {
          masterPlaylsitContent += `#EXT-X-STREAM-INF:BANDWIDTH=${
            res.width * res.height * 50
          },RESOLUTION=${res.width}x${res.height}\n${
            res.resolution
          }/index.m3u8\n`;
          completed++;
          if (completed === resolutions.length) {
            fs.writeFileSync(masterPlaylistPath, masterPlaylsitContent);
            resolve();
          }
        })
        .on("error", (err) => reject(err))
        .run();
      console.log("processed resolution", res);
    });

    console.log("video processed resolution");
  });
});

app.listen(4001, () => {
  console.log("worker running on port", 4000);
});
