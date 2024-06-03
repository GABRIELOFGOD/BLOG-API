// import { UserRole } from "src/utils";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  COMRADE = 'COMRADE'
}


@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: 'USER' | 'ADMIN' | 'COMRADE';

  @Column()
  password: string;

  @Column({ type: 'boolean', default: false })
  blocked: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
