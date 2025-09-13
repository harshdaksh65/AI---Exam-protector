import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./DB/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import examRoutes from "./Routes/examRoutes.js";
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 3000;

// to parse req boy
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/users", examRoutes);

// Custom Middlewares
app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

