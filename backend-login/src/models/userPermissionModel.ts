// userPermissionsModel.ts
import { Model, DataTypes, ForeignKey } from 'sequelize';
import sequelize from '../configs/db';
import User from './userModel';
import Permission from './permissionModel';

interface UserPermissionAttributes {
    id?: number;
    userId: number;
    permissionId: number;
}

class UserPermission extends Model<UserPermissionAttributes> implements UserPermissionAttributes {
    public id!: number;
    public userId!: ForeignKey<number>;
    public permissionId!:  ForeignKey<number>;;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserPermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Permission,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
  },
  {
    sequelize,
    tableName: 'userpermissions',
    timestamps: true,
  }
);

UserPermission.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(UserPermission, { foreignKey: 'userId' });

UserPermission.belongsTo(Permission, { foreignKey: 'permissionId' });
Permission.hasMany(UserPermission, { foreignKey: 'permissionId' });

export default UserPermission;