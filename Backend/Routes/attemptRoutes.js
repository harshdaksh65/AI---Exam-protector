import express from "express";
import { checkExamAttempt } from "../controllers/attemptController.js";

const router = express.Router();

// Check if student has already attempted the exam
router.get("/check/:examId/:studentId", checkExamAttempt);

export default router;
