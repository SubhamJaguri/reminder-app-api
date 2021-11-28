import { Entity, Column } from 'typeorm';
import { Model } from '../common/models/Model';

@Entity('reminders')
export class Reminder extends Model {
  @Column('text')
  title: string;

  @Column('text')
  userId: string;

  @Column('text')
  description: string;

  @Column('text')
  date_time: string;

  toJSON() {
    return { ...this };
  }
}
