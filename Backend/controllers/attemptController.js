import asyncHandler from "express-async-handler";
import Result from "../models/resultModel.js";

// Check if student has already attempted the exam
const checkExamAttempt = asyncHandler(async (req, res) => {
  const { examId, studentId } = req.params;
  const result = await Result.findOne({ exam: examId, student: studentId });
  if (result) {
    res.status(200).json({ attempted: true });
  } else {
    res.status(200).json({ attempted: false });
  }
});

export { checkExamAttempt };
