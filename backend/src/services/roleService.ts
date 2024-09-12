import Role from "../models/roleModel";
import RolePermission from "../models/rolePermissionModel";
import Permission from "../models/permissionModel";
import User from "../models/userModel";
import GroupPermission from "../models/groupPermissionModel";
import { Op, Sequelize } from "sequelize";

export const list = async (page: string = '1', limit: string = '10', search: string = ''): Promise<any> => {
    const roles = await Role.findAll({
        include: [
            {
                model: RolePermission,
                as: 'rolePermission',
                attributes: ["id", "roleId", "permissionId"],
                include: [
                    {
                        model: Permission,
                        as: 'permission',
                        attributes: ["id", "name", "groupId"],
                        include: [
                            {
                                model: GroupPermission,
                                as: 'groupPermission',
                                attributes: [ "id", "name" ]
                            }
                        ]
                    }
                ]
            },
            {
                model: User,
                as: 'users',
                attributes: ["id", "username", "avatar"]
            }
        ]
    });

    const roleIds = roles.map(role => role.id);

    const userCounts = await User.findAll({
        attributes: [
            'role_id',
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'userCount']
        ],
        where: {
            role_id: {
                [Op.in]: roleIds
            }
        },
        group: ['role_id']
    });

    const result = roles.map(role => {
        const countRecord = userCounts.find(count => count.get('role_id') === role.id);
        const userCount = countRecord ? countRecord.get('userCount') : 0;
        return {
            ...role.toJSON(),
            userCount
        };
    });

    return { result };
};

export const getRoleId = async (id: string): Promise<any> => {
    const role = await Role.findByPk(id,{
        include: [
            {
                model: RolePermission,
                as: 'rolePermission',
                attributes: ["id", "roleId", "permissionId"],
                include: [
                    {
                        model: Permission,
                        as: 'permission',
                        attributes: ["id", "name", "groupId"],
                        include: [
                            {
                                model: GroupPermission,
                                as: 'groupPermission',
                                attributes: [ "id", "name" ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    
    return { role };
};
