import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Permission from './permissionModel';

interface GroupPermissionAttributes {
  id?: number;
  name: string;
}

@Table({
  tableName: 'grouppermissions',
  timestamps: true,
})
class GroupPermission extends Model<GroupPermissionAttributes> implements GroupPermissionAttributes {
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

  @HasMany(() => Permission)
  public permissions!: Permission[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default GroupPermission;
