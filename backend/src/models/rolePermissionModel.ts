import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import Permission from './permissionModel';
import Role from './roleModel';

interface rolePermissionAttributes {
  id?: number;
  roleId: number;
  permissionId: number;
}

@Table({
  tableName: 'rolepermissions',
  timestamps: true,
})
class RolePermission extends Model<rolePermissionAttributes> implements rolePermissionAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public roleId!: number;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public permissionId!: number;

  @BelongsTo(() => Role)
  public role!: Role;

  @BelongsTo(() => Permission)
  public permission!: Permission;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default RolePermission;
