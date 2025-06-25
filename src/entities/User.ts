import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Project } from "./Project";
import { Member } from "./Member";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ unique: true })
  cpf: string;

  @OneToMany(() => Project, (project) => project.owner)
  projetos: Project[];

  @OneToMany(() => Member, (member) => member.user)
  memberships: Member[];
}
