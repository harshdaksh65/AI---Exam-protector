import mongoose from "mongoose";

const snapshotSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Snapshot = mongoose.model("Snapshot", snapshotSchema);
export default Snapshot;
