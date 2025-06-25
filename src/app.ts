import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import membershipRoutes from "./routes/memberRoutes";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/member", membershipRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  }
);

export default app;
