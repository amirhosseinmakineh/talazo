import { BaseEntity } from "../../../../domain/base.Entity";
import { Entity, Index, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { RolePermission } from "./rolePermission";
import { User } from "./user";

@Entity("roles")
@Index(["userId", "moduleKey", "roleName"], { unique: true })
export class Role extends BaseEntity {
  @Column({ type: "varchar", length: 64 })
  roleName!: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  moduleKey!: string | null;
  
  @Column({ type: "uuid" })
  userId!: string;

  @ManyToOne(() => User, (u) => u.roles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions!: RolePermission[];
}
