import { Model, DataTypes, ForeignKey } from 'sequelize';
import sequelize from '../configs/db';
import Role from './roleModel';

interface IUserAttributes {
    id?: number;
    email: string;
    password: string;
    role_id: number;
}

class User extends Model<IUserAttributes> implements IUserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public role_id!: ForeignKey<number>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Role,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
}, {
    sequelize,
    tableName: 'users',
});

User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

export default User;
