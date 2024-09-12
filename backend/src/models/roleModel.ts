import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import rolePermission from './rolePermissionModel';
import User from './userModel';

@Table({
  tableName: 'roles',
  timestamps: false,
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

  @HasMany(() => rolePermission)
  public rolePermission!: rolePermission[];

  @HasMany(() => User)
  public users!: User[];
}

export default Role;
