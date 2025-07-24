import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import path from "path";
import { prisma } from "../utils/prisma";
import { Worker, Job } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const redisConnection = { host: "127.0.0.1", port: 6379 };

console.log("Worker process started");

const videoWorker = new Worker(
  'video-processing',
  async (job: Job) => {
    console.log("Processing job:", job.id, job.data);
    const { chapterId, videoPath, outputPath } = job.data;
    console.log("Worker running with job:", videoPath, outputPath);

    const resolutions = [
      { resolution: "360p", width: 640, height: 360, bitrate: "800k", bufsize: "1200k" },
    ];

    let masterPlaylistPath = `${outputPath}/master.m3u8`;
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    await new Promise<void>((resolve, reject) => {
      let masterPlaylistContent = "#EXTM3U\n";
      let completed = 0;

      resolutions.forEach((res) => {
        const resolutionDir = path.join(outputPath, res.resolution);
        if (!fs.existsSync(resolutionDir)) {
          fs.mkdirSync(resolutionDir, { recursive: true });
        }

        ffmpeg(videoPath)
          .addOption([
            `-vf scale=w=${res.width}:h=${res.height}`,
            `-c:v libx264`,
            `-profile:v main`,
            `-crf 20`,
            `-sc_threshold 0`,
            `-g 48`,
            `-keyint_min 48`,
            `-b:v ${res.bitrate}`,
            `-maxrate ${res.bitrate}`,
            `-bufsize ${res.bufsize}`,
            `-c:a aac`,
            `-ar 48000`,
            `-b:a 128k`,
            `-hls_time 4`,
            `-hls_playlist_type vod`,
            `-hls_flags independent_segments`,
            `-hls_segment_filename ${resolutionDir}/segment_%03d.ts`,
          ])
          .output(`${resolutionDir}/index.m3u8`)
          .on("end", () => {
            masterPlaylistContent += `#EXT-X-STREAM-INF:BANDWIDTH=${
              parseInt(res.bitrate) * 8
            },RESOLUTION=${res.width}x${res.height}\n${
              res.resolution
            }/index.m3u8\n`;

            completed++;
            if (completed === resolutions.length) {
              fs.writeFileSync(masterPlaylistPath, masterPlaylistContent);
              console.log(`✅ Completed job for ${videoPath}`);
              resolve();
            }
          })
          .on("error", (err) => {
            console.error("❌ FFmpeg error:", err);
            reject(err);
          })
          .run();
      });
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: { videoUrl: masterPlaylistPath },
    });
  },
  {
    connection: redisConnection,
  }
);

videoWorker.on('failed', (job:any, err:any) => {
  console.error('Job failed', job?.id, err);
});
