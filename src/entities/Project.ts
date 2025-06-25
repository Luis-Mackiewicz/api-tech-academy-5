import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Task } from "./Task";
import { Member } from "./Member";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column({ nullable: true, type: "varchar" })
  imagem: string | null;

  @ManyToOne(() => User, (user) => user.projetos)
  owner: User;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => Member, (member) => member.project)
  members: Member[];
}
