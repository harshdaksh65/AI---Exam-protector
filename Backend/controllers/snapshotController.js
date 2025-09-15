import dotenv from 'dotenv';
dotenv.config();
import ImageKit from "imagekit";
import mongoose from "mongoose";

import Snapshot from "../models/snapshotModel.js";
console.log('ImageKit ENV:', process.env.IK_PUBLIC_KEY, process.env.IK_PRIVATE_KEY, process.env.IK_URL_ENDPOINT);

const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL_ENDPOINT
});

console.log('ImageKit ENV:', process.env.IK_PUBLIC_KEY, process.env.IK_PRIVATE_KEY, process.env.IK_URL_ENDPOINT);

// POST /api/snapshots
// Body: { image: base64, studentId, examId }
export const uploadSnapshot = async (req, res) => {
  try {
    const { image, studentId, examId } = req.body;
    if (!image || !studentId || !examId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const fileName = `snapshot_${studentId}_${examId}_${Date.now()}.jpg`;
    const uploadResponse = await imagekit.upload({
      file: image,
      fileName,
      folder: "/exam-protector/snapshots",
    });
    const snapshot = new Snapshot({
      student: mongoose.Types.ObjectId(studentId),
      exam: mongoose.Types.ObjectId(examId),
      url: uploadResponse.url,
      createdAt: new Date(),
    });
    await snapshot.save();
    res.status(201).json({ url: uploadResponse.url });
  } catch (err) {
    console.error("Snapshot upload error:", err);
    res.status(500).json({ message: "Failed to upload snapshot" });
  }
};

// GET /api/snapshots/:studentId/:examId
export const getSnapshots = async (req, res) => {
  try {
    const { studentId, examId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: "Invalid studentId or examId" });
    }
    const snapshots = await Snapshot.find({
      student: new mongoose.Types.ObjectId(studentId),
      exam: new mongoose.Types.ObjectId(examId),
    }).sort({ createdAt: 1 });
    res.json(snapshots);
  } catch (err) {
    console.error("Get snapshots error:", err);
    res.status(500).json({ message: "Failed to fetch snapshots" });
  }
};
