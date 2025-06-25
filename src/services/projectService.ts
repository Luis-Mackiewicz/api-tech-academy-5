import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";
import { User } from "../entities/User";

export class ProjectService {
  private projectRepo = AppDataSource.getRepository(Project);
  private userRepo = AppDataSource.getRepository(User);

  async listAll(userId: number) {
    return this.projectRepo.find({
      where: { owner: { id: userId } },
      relations: ["owner", "members", "tasks"],
    });
  }

  async findById(id: number, userId: number) {
    const project = await this.projectRepo.findOne({
      where: { id, owner: { id: userId } },
      relations: ["owner", "members", "tasks"],
    });
    if (!project) throw new Error("Projeto não encontrado ou acesso negado.");
    return project;
  }

  async create(
    nome: string,
    descricao: string,
    imagem: string | null,
    userId: number
  ) {
    const owner = await this.userRepo.findOneBy({ id: userId });
    if (!owner) throw new Error("Usuário não encontrado.");

    const project = this.projectRepo.create({
      nome,
      descricao,
      imagem: imagem ?? undefined,
      owner,
    });
    return this.projectRepo.save(project);
  }

  async update(
    id: number,
    userId: number,
    nome: string,
    descricao: string,
    imagem: string | null
  ) {
    const project = await this.projectRepo.findOne({
      where: { id, owner: { id: userId } },
    });
    if (!project) throw new Error("Projeto não encontrado ou acesso negado.");

    project.nome = nome;
    project.descricao = descricao;
    project.imagem = imagem;
    return this.projectRepo.save(project);
  }

  async delete(id: number, userId: number) {
    const project = await this.projectRepo.findOne({
      where: { id, owner: { id: userId } },
    });
    if (!project) throw new Error("Projeto não encontrado ou acesso negado.");
    await this.projectRepo.remove(project);
    return { message: "Projeto removido com sucesso." };
  }
}
