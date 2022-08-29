// @ts-nocheck
import express from "express";
import multer from "multer";

const uploadRoute = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, _file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

uploadRoute.post(
  "/",
  upload.single("file", (_req, res) => {
    try {
      res.status(200).json({ message: "File uploaded successfully!" });
    } catch (error) {
      console.log(error);
    }
  })
);

export default uploadRoute;
