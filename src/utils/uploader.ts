import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadsDir = "./uploads";

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log("Uploads directory created:", uploadsDir);
  }
} catch (err) {
  console.error("Error ensuring uploads directory exists:", err);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuid()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const uploader = multer({ storage });

export default uploader;
