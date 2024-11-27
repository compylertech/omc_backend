import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  fileName: string;

  @Column()
  size: string;

  @Column({ type: 'varchar', nullable: false })
  fileUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(
    fileName: string,
    size: string,
    fileUrl: string,
    updatedAt: Date,
    createdAt: Date = new Date(),
  ) {
    this.fileName = fileName;
    this.size = size;
    this.fileUrl = fileUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
