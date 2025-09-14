// Batch: Get multiple results by IDs
const getResultsBatch = asyncHandler(async (req, res) => {
  const { resultIds } = req.body;
  if (!Array.isArray(resultIds) || resultIds.length === 0) {
    return res.status(400).json({ error: 'No resultIds provided' });
  }
  const results = await Result.find({ _id: { $in: resultIds } });
  res.status(200).json(results);
});
import Question from "../models/quesModel.js";

// Create result for a student after exam submission
const createStudentResult = asyncHandler(async (req, res) => {
  console.log('Result submission request body:', req.body);
  const { studentId, examId, answers } = req.body; // answers: [{questionId, selectedOptionIndex}]
  // Fetch all questions for the exam
  const questions = await Question.find({ examId });
  let correctCount = 0;
  questions.forEach((q) => {
    const answer = answers.find((a) => a.questionId === q._id.toString());
    if (answer) {
      const selectedOption = q.options[answer.selectedOptionIndex];
      if (selectedOption && selectedOption.isCorrect) {
        correctCount++;
      }
    }
  });
  const totalQuestions = questions.length;
  const percentageScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  // Upsert result (update if exists, else create)
  let result = await Result.findOne({ student: studentId, exam: examId });
  if (result) {
    result.score = percentageScore;
    // Do NOT overwrite status here; keep teacher's status
    await result.save();
    // Link cheating log to result
    await linkCheatingLogToResult(studentId, examId, result._id);
    res.status(200).json(result);
  } else {
    result = new Result({
      student: studentId,
      exam: examId,
      score: percentageScore,
      status: "pending",
    });
    await result.save();
    // Link cheating log to result
    await linkCheatingLogToResult(studentId, examId, result._id);
    res.status(201).json(result);
  }
});
import asyncHandler from "express-async-handler";
import CheatingLog from "../models/cheatingLogModel.js";
// Helper to link cheating log to result
const linkCheatingLogToResult = async (studentId, examId, resultId) => {
  // Find cheating log by examId and student (by email or username if available)
  // This assumes you have a way to match student to cheating log (e.g., email)
  // You may need to adjust this logic based on your data model
  const student = studentId;
  // Try to find cheating logs for this exam and student
  await CheatingLog.updateMany(
    { examId, email: { $exists: true } }, // You may want to match by email or username
    { $set: { resultId } }
  );
};
import Result from "../models/resultModel.js";
// Get all results for a student (student view)
const getAllResultsForStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const results = await Result.find({ student: studentId }).populate("exam");
  res.status(200).json(results);
});

// Get all results for an exam (teacher view)
const getResultsByExam = asyncHandler(async (req, res) => {
  const { examId } = req.params;
  const results = await Result.find({ exam: examId })
    .populate("student", "name email role")
    .populate("exam", "examName");
  res.status(200).json(results);
});

// Get result for a student for an exam (student view)
const getStudentResult = asyncHandler(async (req, res) => {
  const { examId, studentId } = req.params;
  const result = await Result.findOne({ exam: examId, student: studentId }).populate("exam");
  if (!result) {
    res.status(404);
    throw new Error("Result not found");
  }
  res.status(200).json(result);
});

// Teacher updates result status for a student
const updateResultStatus = asyncHandler(async (req, res) => {
  const { resultId } = req.params;
  const { status, updatedBy } = req.body;
  const result = await Result.findById(resultId);
  if (!result) {
    res.status(404);
    throw new Error("Result not found");
  }
  result.status = status;
  result.updatedBy = updatedBy;
  await result.save();
  res.status(200).json(result);
});

export { getResultsByExam, getStudentResult, updateResultStatus, getAllResultsForStudent, createStudentResult, getResultsBatch };
