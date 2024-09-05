import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import groupPermission from './groupPermissionModel';

interface PermissionAttributes {
  id?: number;
  name: string;
}

@Table({
  tableName: 'permissions',
  timestamps: true,
})
class Permission extends Model<PermissionAttributes> implements PermissionAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @HasMany(() => groupPermission)
  public groupPermission!: groupPermission[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Permission;
