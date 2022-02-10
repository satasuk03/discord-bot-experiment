import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  @Index()
  clientId!: string;

  @Column({ type: "integer", default: 1 })
  level!: number;

  @Column({ type: "integer", default: 0 })
  xp!: number;

  @Column({ type: "integer", default: 0 })
  gfCoinBalance!: number;

  @Column({ type: "timestamptz", default: new Date("1995-12-17T03:24:00") })
  lastDailyQuest!: Date;
}
