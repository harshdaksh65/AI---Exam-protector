import express from "express";
import {
  getResultsByExam,
  getStudentResult,
  updateResultStatus,
  getAllResultsForStudent,
  createStudentResult,
} from "../controllers/resultController.js";

const router = express.Router();
// Student: Submit exam and create result
router.post("/student", createStudentResult);
// Student: Get all results for a student
router.get("/student/:studentId", getAllResultsForStudent);

// Teacher: Get all results for an exam
router.get("/exam/:examId", getResultsByExam);

// Student: Get result for a specific exam
router.get("/exam/:examId/student/:studentId", getStudentResult);

// Teacher: Update result status for a student
router.put("/:resultId", updateResultStatus);

export default router;
