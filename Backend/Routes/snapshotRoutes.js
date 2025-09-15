import express from "express";
import { uploadSnapshot, getSnapshots } from "../controllers/snapshotController.js";
const router = express.Router();

// POST /api/snapshots
router.post("/", uploadSnapshot);

// GET /api/snapshots/:studentId/:examId
router.get("/:studentId/:examId", getSnapshots);

export default router;
