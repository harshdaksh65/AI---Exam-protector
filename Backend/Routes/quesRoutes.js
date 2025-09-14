import express from "express";
import { getQuestionsByExamId, createQuestion } from "../controllers/quesController.js";

const router = express.Router();

// Get all questions for an exam
router.get("/exam/:examId", getQuestionsByExamId);

// Create a new question
router.post("/", createQuestion);

export default router;
