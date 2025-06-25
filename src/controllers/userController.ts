import { Request, Response } from "express";
import { UserService } from "../services/userService";

const service = new UserService();

export class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      // O id do usuário vem do middleware de autenticação (req.userId)
      // @ts-ignore
      const id = req.userId;
      const user = await service.findById(id);
      // Não retorna a senha!
      return res.json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
      });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      // @ts-ignore
      const id = req.userId;
      const { nome, senha, cpf } = req.body;
      const updated = await service.updateUser(id, nome, senha, cpf);
      return res.json(updated);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async deleteProfile(req: Request, res: Response) {
    try {
      // @ts-ignore
      const id = req.userId;
      const result = await service.deleteUser(id);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
