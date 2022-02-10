import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Unique,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Player } from './Player';

@Entity()
@Unique(['clientId', 'itemId'])
export class Inventory extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  @Index()
  clientId!: string;

  @PrimaryColumn({ type: 'integer' })
  @Index()
  itemId!: number;

  @Column({ type: 'integer' })
  amount!: number;

  @ManyToOne(() => Player, (player) => player.clientId)
  @JoinColumn({ name: 'clientId' })
  player!: Player;
}
