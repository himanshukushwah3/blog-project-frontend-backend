import grid from "gridfs-stream";
import mongoose from "mongoose";

const conn = mongoose.connection;

let gfs, gridfsBucket;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

const url = "http://localhost:8000";

// =================================================================
export const uploadImage = (req, res) => {
  if (!req.file) return res.status(404).json("File not found");

  const imageUrl = `${url}/file/${req.file.filename}`;
  console.log(imageUrl);

  res.status(200).json(imageUrl);
};

// =================================================================

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
