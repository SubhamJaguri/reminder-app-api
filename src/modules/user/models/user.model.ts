import { Entity, Column } from 'typeorm';
import { Model } from '../../common/models/Model';

@Entity('users')
export class User extends Model {
  @Column('text')
  email: string;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @Column('text')
  deviceToken: string;

  toJSON() {
    return { ...this, password: undefined, tokenVersion: undefined };
  }
}
