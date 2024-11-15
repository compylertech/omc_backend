import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
    userId!: number;

  @Column()
  firstName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  constructor(firstName: string, email: string, password: string, isActive: boolean = true) {
    this.firstName = firstName;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
  }
}
