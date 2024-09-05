import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import groupPermission from './groupPermissionModel';
import User from './userModel';

@Table({
  tableName: 'roles',
  timestamps: true,
})
class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public name!: string;

  @HasMany(() => groupPermission)
  public groupPermission!: groupPermission[];

  @HasMany(() => User)
  public users!: User[];
}

export default Role;
