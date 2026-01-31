import { BaseEntity } from "../../../../Core/domain/base.Entity";
import { Entity, Index, Column, OneToMany, ManyToOne } from "typeorm";
import { RolePermission } from "./rolePermission";
import { User } from "./user";


@Entity("roles")
@Index(["moduleKey", "roleName"], { unique: true })
export class Role extends BaseEntity {
     @Column({ type: "varchar", length: 64 })
     roleName!: string;

     @Column({ type: "varchar", length: 64, nullable: true })
     moduleKey!: string | null;

 @ManyToOne(()=> User,(u)=> u.roles,{
      onDelete:"CASCADE"
 })
     user!: User;

     @OneToMany(() => RolePermission, (rp) => rp.role)
     rolePermissions!: RolePermission[];
}
