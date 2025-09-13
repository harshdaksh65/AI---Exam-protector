import asyncHandler from "express-async-handler";
import Exam from "./../models/examModel.js";



const getExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(200).json(exams);
});


const createExam = asyncHandler(async (req, res) => {
  const { examName, totalQuestions, duration, liveDate, deadDate } = req.body;

  const exam = new Exam({
    examName,
    totalQuestions,
    duration,
    liveDate,
    deadDate,
  });

  const createdExam = await exam.save();

  if (createdExam) {
    res.status(201).json(createdExam);
  } else {
    res.status(400);
    throw new Error("Invalid Exam Data");
  }
});

export { getExams, createExam };
