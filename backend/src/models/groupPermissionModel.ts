import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import Permission from './permissionModel';
import Role from './roleModel';

interface groupPermissionAttributes {
  id?: number;
  roleId: number;
  permissionId: number;
}

@Table({
  tableName: 'grouppermissions',
  timestamps: true,
})
class groupPermission extends Model<groupPermissionAttributes> implements groupPermissionAttributes {
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

export default groupPermission;
