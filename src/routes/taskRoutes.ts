import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Listar tarefas de um projeto
router.get("/project/:projectId", authMiddleware, TaskController.listByProject);

// Detalhe de uma tarefa
router.get("/:id", authMiddleware, TaskController.getById);

// Criar tarefa em um projeto
router.post("/project/:projectId", authMiddleware, TaskController.create);

router.put("/:id", authMiddleware, TaskController.update);

router.delete("/:id", authMiddleware, TaskController.delete);

export default router;
