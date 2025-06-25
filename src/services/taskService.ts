import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { Project } from "../entities/Project";
import { User } from "../entities/User";

export class TaskService {
  private taskRepo = AppDataSource.getRepository(Task);
  private projectRepo = AppDataSource.getRepository(Project);
  private userRepo = AppDataSource.getRepository(User);

  async listByProject(projectId: number) {
    return this.taskRepo.find({
      where: { project: { id: projectId } },
      relations: ["responsavel", "project"],
    });
  }

  async findById(id: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ["responsavel", "project"],
    });
    if (!task) throw new Error("Tarefa não encontrada.");
    return task;
  }

  async create(
    projectId: number,
    titulo: string,
    descricao: string,
    status: "todo" | "doing" | "done",
    responsavelId?: number
  ) {
    const project = await this.projectRepo.findOneBy({ id: projectId });
    if (!project) throw new Error("Projeto não encontrado.");

    let responsavel = null;
    if (responsavelId) {
      responsavel = await this.userRepo.findOneBy({ id: responsavelId });
      if (!responsavel) throw new Error("Responsável não encontrado.");
    }

    const task = this.taskRepo.create({
      titulo,
      descricao,
      status,
      project,
      ...(responsavel ? { responsavel } : {}),
    });
    return this.taskRepo.save(task);
  }

  async update(
    id: number,
    titulo: string,
    descricao: string,
    status: "todo" | "doing" | "done",
    responsavelId?: number
  ) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ["responsavel", "project"],
    });
    if (!task) throw new Error("Tarefa não encontrada.");

    task.titulo = titulo;
    task.descricao = descricao;
    task.status = status;

    if (responsavelId !== undefined) {
      if (responsavelId === null) {
        task.responsavel = null;
      } else {
        const responsavel = await this.userRepo.findOneBy({
          id: responsavelId,
        });
        if (!responsavel) throw new Error("Responsável não encontrado.");
        task.responsavel = responsavel;
      }
    }

    return this.taskRepo.save(task);
  }

  async delete(id: number) {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) throw new Error("Tarefa não encontrada.");
    await this.taskRepo.remove(task);
    return { message: "Tarefa removida com sucesso." };
  }
}
