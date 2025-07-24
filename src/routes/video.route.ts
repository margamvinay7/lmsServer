import { Router } from "express";
import uploadVideo from "../controllers/video.controller";
import uploader from "../utils/uploader";

const router = Router();
router.post("/uploadVideo", uploader.single("file"), uploadVideo);

export default router;
