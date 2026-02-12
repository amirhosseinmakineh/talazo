import { BaseEntity } from "../../../../Core/domain/base.Entity";
import { Entity, Index, Column, ManyToOne, JoinColumn } from "typeorm";
import { Permission } from "./permission";
import { Role } from "./role";

@Entity("role_permissions")
@Index(["roleId", "permissionId"], { unique: true })
export class RolePermission extends BaseEntity {
     @Column({ type: "uuid" })
     roleId!: string;

     @Column({ type: "uuid" })
     permissionId!: string;

     @ManyToOne(() => Role, (r) => r.rolePermissions, { onDelete: "CASCADE" })
     @JoinColumn({ name: "roleId" })
     role!: Role;

     @ManyToOne(() => Permission, (p) => p.rolePermissions, { onDelete: "CASCADE" })
     @JoinColumn({ name: "permissionId" })
     permission!: Permission;
}
