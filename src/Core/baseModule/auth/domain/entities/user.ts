import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../../../domain/base.Entity";
import { UserStatus } from "./userStatus";
import { Role } from "./role";

@Entity("users")
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 64, unique: true,nullable : false })
  username!: string;

  @Column({ type: "varchar", length: 255, select: true ,nullable : false})
  passwordHash!: string;

  @Column({ type: "varchar", length: 11, unique: true ,nullable : true})
  mobileNumber!: string;

@Column({type: 'smallint',default: 1,})
  userStatus!: UserStatus;
  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshTokenHash?: string | null;

  @Column({ type: "timestamp", nullable: true })
  refreshTokenExpiresAt?: Date | null;
  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordResetTokenHash?: string | null;

  @Column({ type: "timestamp", nullable: true })
  passwordResetExpiresAt?: Date | null;

  @OneToMany(() => Role, (ur) => ur.user)
  roles !: Role[];
}

