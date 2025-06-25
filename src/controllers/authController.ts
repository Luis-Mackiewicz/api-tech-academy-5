import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

const service = new AuthService();

export class AuthController {
  static register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { nome, email, senha, cpf } = req.body;
      const result = await service.register(nome, email, senha, cpf);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  static login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, senha } = req.body;
      const result = await service.login(email, senha);
      res.json(result);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  };
}
