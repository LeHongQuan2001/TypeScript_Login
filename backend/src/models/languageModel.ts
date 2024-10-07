import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'languages',
  timestamps: true,
})
class Language extends Model {
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
  public flag!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public locale!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public name!: string;
}

export default Language;
