import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import rolePermission from './rolePermissionModel';
import groupPermission from './groupPermissionModel';

interface PermissionAttributes {
  id?: number;
  name: string;
  groupId: number;
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

  @ForeignKey(() => groupPermission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public groupId!: number;

  @BelongsTo(() => groupPermission)
  public groupPermission!: groupPermission;

  @HasMany(() => rolePermission)
  public rolePermission!: rolePermission[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Permission;
