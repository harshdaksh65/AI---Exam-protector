import dotenv from 'dotenv';
dotenv.config();
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Video from "../models/videoModel.js";
import multer from "multer";

const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL_ENDPOINT,
});

// POST /api/videos
export const uploadVideo = async (req, res) => {
  try {
    const { studentId, examId } = req.body;
    const file = req.file;
    if (!file || !studentId || !examId) {
      console.error('Missing required fields:', { file, studentId, examId });
      return res.status(400).json({ message: "Missing required fields" });
    }
    console.log('Uploading video to ImageKit:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      bufferType: typeof file.buffer,
    });
    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: file.buffer,
      fileName: `video_${studentId}_${examId}_${Date.now()}.webm`,
      folder: "/exam-protector/videos",
      mime: file.mimetype || "video/webm",
    });
    console.log('ImageKit upload response:', uploadResponse);
    // Save video URL in DB
    const video = new Video({
      student: mongoose.Types.ObjectId(studentId),
      exam: mongoose.Types.ObjectId(examId),
      url: uploadResponse.url,
      createdAt: new Date(),
    });
    await video.save();
    res.status(201).json({ url: uploadResponse.url });
  } catch (err) {
    console.error("Video upload error:", err);
    res.status(500).json({ message: "Failed to upload video", error: err?.message || err });
  }
};

// GET /api/videos/:studentId/:examId
export const getVideos = async (req, res) => {
  try {
    const { studentId, examId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: "Invalid studentId or examId" });
    }
    const videos = await Video.find({
      student: new mongoose.Types.ObjectId(studentId),
      exam: new mongoose.Types.ObjectId(examId),
    }).sort({ createdAt: 1 });
    res.json(videos);
  } catch (err) {
    console.error("Get videos error:", err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};
