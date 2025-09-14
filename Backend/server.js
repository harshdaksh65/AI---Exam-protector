import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./DB/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import examRoutes from "./Routes/examRoutes.js";
import resultRoutes from "./Routes/resultRoutes.js";
import attemptRoutes from "./Routes/attemptRoutes.js";
import quesRoutes from "./Routes/quesRoutes.js";
dotenv.config();
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

// Custom Middlewares
app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

