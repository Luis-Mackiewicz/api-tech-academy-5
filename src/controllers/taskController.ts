import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

const service = new TaskService();

export class TaskController {
  static async listByProject(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const tasks = await service.listByProject(projectId);
      res.json(tasks);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const task = await service.findById(id);
      res.json(task);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const { titulo, descricao, status, responsavelId } = req.body;
      const task = await service.create(
        projectId,
        titulo,
        descricao,
        status,
        responsavelId
      );
      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { titulo, descricao, status, responsavelId } = req.body;
      const task = await service.update(
        id,
        titulo,
        descricao,
        status,
        responsavelId
      );
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await service.delete(id);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
