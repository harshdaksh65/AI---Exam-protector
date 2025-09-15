import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env"});
console.log("TEST_VAR:", process.env.TEST_VAR);
console.log("IK_PUBLIC_KEY:", process.env.IK_PUBLIC_KEY);
console.log("IK_PRIVATE_KEY:", process.env.IK_PRIVATE_KEY);
console.log("IK_URL_ENDPOINT:", process.env.IK_URL_ENDPOINT)
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./DB/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import videoRoutes from "./Routes/videoRoutes.js";
import snapshotRoutes from "./Routes/snapshotRoutes.js";
import examRoutes from "./Routes/examRoutes.js";
import resultRoutes from "./Routes/resultRoutes.js";
import attemptRoutes from "./Routes/attemptRoutes.js";
import quesRoutes from "./Routes/quesRoutes.js";
connectDB();
const app = express();
const port = process.env.PORT || 5000;

// to parse req boy
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", quesRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/snapshots", snapshotRoutes);
app.use("/api/videos", videoRoutes);
app.get('/', (req, res) => {
  res.send('API is running');
});

// Custom Middlewares
app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
  
});

