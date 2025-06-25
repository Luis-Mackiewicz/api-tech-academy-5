import { AppDataSource } from "../data-source";
import { Member } from "../entities/Member";
import { User } from "../entities/User";
import { Project } from "../entities/Project";

export class MemberService {
  private memberRepo = AppDataSource.getRepository(Member);
  private userRepo = AppDataSource.getRepository(User);
  private projectRepo = AppDataSource.getRepository(Project);

  async listByProject(projectId: number) {
    return this.memberRepo.find({
      where: { project: { id: projectId } },
      relations: ["user", "project"],
    });
  }

  async addMember(projectId: number, userId: number, role = "Membro") {
    const user = await this.userRepo.findOneBy({ id: userId });
    const project = await this.projectRepo.findOneBy({ id: projectId });
    if (!user || !project) throw new Error("Usuário ou projeto não encontrado");

    // Evita duplicidade
    const exists = await this.memberRepo.findOne({
      where: { user: { id: userId }, project: { id: projectId } },
    });
    if (exists) throw new Error("Usuário já é membro deste projeto");

    const member = this.memberRepo.create({ user, project, role });
    return this.memberRepo.save(member);
  }

  async updateRole(memberId: number, role: string) {
    const member = await this.memberRepo.findOneBy({ id: memberId });
    if (!member) throw new Error("Membro não encontrado");
    member.role = role;
    return this.memberRepo.save(member);
  }

  async removeMember(memberId: number) {
    const member = await this.memberRepo.findOneBy({ id: memberId });
    if (!member) throw new Error("Membro não encontrado");
    return this.memberRepo.remove(member);
  }
}
