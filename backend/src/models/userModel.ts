import { Table, Column, Model, ForeignKey, BelongsTo, DataType, HasMany, Index } from 'sequelize-typescript';
import Role from './roleModel';
import groupPermission from './rolePermissionModel';
import Verification from './verificationModel';
import { OneToOne } from 'typeorm';

interface IUserAttributes {
  id?: number;
  fullname?: string;
  avatar?: string;
  username: string;
  email: string;
  birthday?: Date;
  password: string;
  phone?: string;
  address?: string;
  role_id?: number;
  otp?: string;
  status?: string;
}

@Table({
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
})
class User extends Model<IUserAttributes> implements IUserAttributes {
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
  public fullname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public avatar!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public email!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public birthday!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public password!: string;

  @Column({
  type: DataType.STRING,
  allowNull: false,
  })
  public phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public address!: string;
  
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public role_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public otp!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public status!: string;

  @BelongsTo(() => Role)
  public role!: Role;

  @OneToOne(() => Verification)
  public verification!: Verification;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default User;
