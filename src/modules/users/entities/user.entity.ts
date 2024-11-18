import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    isActive: boolean = true,
    createdAt: Date = new Date(),
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.createdAt = createdAt;
  }
}
