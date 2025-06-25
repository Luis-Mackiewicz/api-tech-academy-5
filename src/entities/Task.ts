import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({ default: "todo" })
  status: "todo" | "doing" | "done";

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToOne(() => User, { nullable: true })
  responsavel: User | null;
}
