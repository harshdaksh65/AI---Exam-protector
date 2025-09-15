import mongoose from "mongoose";

const resultSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pass", "fail", "cheater", "pending"],
      default: "pending",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Teacher who updated
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
