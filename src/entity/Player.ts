import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Inventory } from './Inventory';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  @Index()
  clientId!: string;

  // TODO: should be removed and calculate from level and equipment
  @Column({ type: 'integer', default: 100 })
  maxHp!: number;

  @Column({ type: 'integer', default: 100 })
  hp!: number;

  @Column({ type: 'integer', default: 1 })
  level!: number;

  @Column({ type: 'integer', default: 0 })
  xp!: number;

  @Column({ type: 'integer', default: 0 })
  gfCoinBalance!: number;

  @Column({ type: 'timestamptz', default: new Date('1995-12-17T03:24:00') })
  lastDailyQuest!: Date;

  @OneToMany(() => Inventory, (inv) => inv.clientId)
  items!: Inventory[];
}
