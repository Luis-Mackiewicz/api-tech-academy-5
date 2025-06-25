import { Request, Response } from "express";
import { ProjectService } from "../services/projectService";
const service = new ProjectService();

export class ProjectController {
  static async listAll(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.userId;
      const projects = await service.listAll(userId);
      res.json(projects);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      // @ts-ignore
      const userId = req.userId;
      const project = await service.findById(id, userId);
      res.json(project);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { nome, descricao, imagem } = req.body;
      // @ts-ignore
      const userId = req.userId;
      const project = await service.create(nome, descricao, imagem, userId);
      res.status(201).json(project);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { nome, descricao, imagem } = req.body;
      // @ts-ignore
      const userId = req.userId;
      const project = await service.update(id, userId, nome, descricao, imagem);
      res.json(project);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      // @ts-ignore
      const userId = req.userId;
      const result = await service.delete(id, userId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
