import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import User from './userModel';
import Permission from './permissionModel';

interface UserPermissionAttributes {
  id?: number;
  userId: number;
  permissionId: number;
}

@Table({
  tableName: 'userpermissions',
  timestamps: true,
})
class UserPermission extends Model<UserPermissionAttributes> implements UserPermissionAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public userId!: number;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public permissionId!: number;

  @BelongsTo(() => User)
  public user!: User;

  @BelongsTo(() => Permission)
  public permission!: Permission;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default UserPermission;