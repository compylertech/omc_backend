import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('privileges')
export class Privilege {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: new Date() })
  createdAt: Date;

  constructor(name: string, description: string, createdAt: Date = new Date()) {
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
  }
}
