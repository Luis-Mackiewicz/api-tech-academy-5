import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async findById(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new Error("Usuário não encontrado.");
    return user;
  }

  async updateUser(id: number, nome: string, senha: string, cpf: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new Error("Usuário não encontrado.");

    user.nome = nome;
    user.cpf = cpf;
    if (senha) {
      user.senha = await bcrypt.hash(senha, 10);
    }
    await this.userRepo.save(user);

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      cpf: user.cpf,
    };
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new Error("Usuário não encontrado.");
    await this.userRepo.remove(user);
    return { message: "Usuário removido com sucesso." };
  }
}
