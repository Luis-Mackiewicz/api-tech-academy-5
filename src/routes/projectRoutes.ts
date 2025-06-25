import { Router } from "express";
import { ProjectController } from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, ProjectController.listAll);
router.get("/:id", authMiddleware, ProjectController.getById);
router.post("/", authMiddleware, ProjectController.create);
router.put("/:id", authMiddleware, ProjectController.update);
router.delete("/:id", authMiddleware, ProjectController.delete);

export default router;
