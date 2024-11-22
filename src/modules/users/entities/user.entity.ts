import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { File } from 'src/modules/files/entities/file.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'fileID' })
  profilePicture: File | null;

  @Column({ default: new Date() })
  createdAt: Date;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    profilePicture: File,
    isActive: boolean = true,
    createdAt: Date = new Date(),
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.profilePicture = profilePicture;
    this.createdAt = createdAt;
  }
}
