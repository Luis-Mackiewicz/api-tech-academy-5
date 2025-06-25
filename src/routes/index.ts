import { Router } from "express";
import projectRoutes from "./projectRoutes";
import taskRoutes from "./taskRoutes";
import membershipRoutes from "./memberRoutes";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/member", membershipRoutes);
router.use("/auth", authRoutes);

export default router;
