import multer from "multer";
import dotenv from "dotenv";
import { GridFsStorage } from "multer-gridfs-storage";

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${username}:${password}@cluster0.e64um.mongodb.net/blog-app`,
  file: (req, file) => {
    console.log(file);
    console.log("Received file:", file.originalname, file.mimetype);

    const match = ["image/png", "image/jpg", "image/jpeg"];

    if (!match.includes(file.mimetype)) {
      // return `${Date.now()}-blog-${file.originalname}`;
      console.error("File type not allowed:", file.mimetype);
      return null;
    }

    const filename = `${Date.now()}-blog-${file.originalname}`;
    console.log("Generated filename:", filename);

    return {
      bucketName: "photos",
      filename,
    };
  },
});

export const upload = multer({ storage });
