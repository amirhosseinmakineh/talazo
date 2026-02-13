import { BaseEntity } from "../../../../domain/base.Entity";
import { Entity, Column, OneToMany } from 'typeorm'
import { RolePermission } from "./rolePermission";


@Entity("permissions")
export class Permission extends BaseEntity {
     @Column({ type: "varchar", length: 120, unique: true })
     key!: string;

     @Column({ type: "varchar", length: 120 })
     permissionName!: string;

     @Column({ type: "varchar", length: 64, nullable: true })
     moduleKey!: string | null;

     @OneToMany(() => RolePermission, (rp) => rp.permission)
     rolePermissions!: RolePermission[];
}
