import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import User from './userModel';
import { OneToOne } from 'typeorm';

@Table({
  tableName: 'verifications',
  timestamps: false,
})
class Verification extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public user_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public code!: string;

  @OneToOne(() => User)
  public users!: User;
}

export default Verification;
