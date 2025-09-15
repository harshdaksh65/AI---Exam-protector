import asyncHandler from "express-async-handler";
import Result from "../models/resultModel.js";

// Check if student has already attempted the exam
const checkExamAttempt = asyncHandler(async (req, res) => {
  const { examId, studentId } = req.params;
  // Find the exam document by examId string
  const Exam = await import('../models/examModel.js').then(m => m.default);
  const examDoc = await Exam.findOne({ examId });
  if (!examDoc) {
    return res.status(200).json({ attempted: false });
  }
  const result = await Result.findOne({ exam: examDoc._id, student: studentId });
  if (result) {
    res.status(200).json({ attempted: true });
  } else {
    res.status(200).json({ attempted: false });
  }
});

export { checkExamAttempt };
