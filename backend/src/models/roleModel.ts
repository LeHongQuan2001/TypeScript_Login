import { Table, Column, Model, DataType } from 'sequelize-typescript';

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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public permissions!: string;
}

export default Role;
