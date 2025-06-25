import { Request, Response } from "express";
import { AuthService } from "../services/authService";

const service = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { nome, email, senha, cpf } = req.body;
      const result = await service.register(nome, email, senha, cpf);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const result = await service.login(email, senha);
      return res.json(result);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
}
