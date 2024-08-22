import { Model, DataTypes } from 'sequelize';
import sequelize from '../configs/db';

interface PermissionAttributes {
  id?: number;
  name: string;
}

class Permission extends Model<PermissionAttributes> implements PermissionAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'permissions',
    timestamps: true,
  }
);

export default Permission;
