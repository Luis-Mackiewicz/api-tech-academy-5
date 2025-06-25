import { Request, Response } from "express";
import { MemberService } from "../services/MemberService";

const service = new MemberService();

export class MemberController {
  static async listByProject(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const members = await service.listByProject(projectId);
      res.json(members);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async addMember(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const { userId, role } = req.body;
      const member = await service.addMember(projectId, userId, role);
      res.status(201).json(member);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateRole(req: Request, res: Response) {
    try {
      const memberId = Number(req.params.memberId);
      const { role } = req.body;
      const member = await service.updateRole(memberId, role);
      res.json(member);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async removeMember(req: Request, res: Response) {
    try {
      const memberId = Number(req.params.memberId);
      await service.removeMember(memberId);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
