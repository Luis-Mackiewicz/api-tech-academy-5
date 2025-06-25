import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async register(nome: string, email: string, senha: string, cpf: string) {
    if (!nome || !email || !senha || !cpf) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    const existing = await this.userRepo.findOneBy({ email });
    if (existing) {
      throw new Error("E-mail já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = this.userRepo.create({
      nome,
      email,
      senha: hashedPassword,
      cpf,
    });
    await this.userRepo.save(user);

    return { message: "Usuário cadastrado com sucesso!" };
  }

  async login(email: string, senha: string) {
    if (!email || !senha) {
      throw new Error("E-mail e senha são obrigatórios.");
    }

    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "8h" });

    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
  }
}
