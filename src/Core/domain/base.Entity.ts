import { PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Column({ type: 'timestamp', nullable:true,select: false })
  createdAt!: string | null;
  
  @Column({ type: 'timestamp', nullable: true, select:false})
  updatedAt!: string | null;
  
  @Column({ type: 'timestamp', nullable: true,select : false })
  deletedAt!: string | null;
  
  @Column({ default: false })
  isDeleted!: boolean;

}