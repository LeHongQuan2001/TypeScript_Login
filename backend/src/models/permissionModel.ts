import { Table, Column, Model, DataType } from 'sequelize-typescript';

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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Permission;
