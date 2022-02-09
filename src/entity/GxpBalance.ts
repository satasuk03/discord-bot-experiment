import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";

@Entity()
export class UserXp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  @Index()
  clientId!: string;

  @Column({ type: "integer", default: 1 })
  level!: number;

  @Column({ type: "integer", default: 0 })
  xp!: number;
}
