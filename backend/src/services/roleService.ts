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
        ],
        order: [['id', 'ASC']],

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

export const createInfoRole = async (data: any): Promise<any> => {
    try {
        const name = data.name;
        const permissionIds = data.permissionIds || [];
        const newRole = await Role.create({ name });
        if (permissionIds.length > 0) {
            for (const permissionId of permissionIds) {
                const permission = await Permission.findByPk(permissionId);
                if (!permission) {
                    throw new Error(`Permission with ID ${permissionId} not found`);
                }
                await RolePermission.create({ roleId: newRole.id, permissionId });
            }
        }
        return { newRole };
    } catch (error) {
        console.error('Error creating role or assigning permissions:', error);
        throw error;
    }
};

export const updateInfoRole = async (id: number, data: any): Promise<any> => {
    try {
        const name = data.name;
        const permissionIds = data.permissionIds || [];
        const role = await Role.findByPk(id);
        if (!role) {
            throw new Error(`Role with ID ${id} not found`);
        } 
        role.name = name;
        await role.save();
        await RolePermission.destroy({ where: { roleId: id } });
        for (const permissionId of permissionIds) {
            const permission = await Permission.findByPk(permissionId);
            if (!permission) {
                throw new Error(`Permission with ID ${permissionId} not found`);
            } 
            await RolePermission.create({ roleId: id, permissionId });
        } 
        return { role };
    } catch (error) {
        console.error('Error updating role or assigning permissions:', error);
        throw error;
    } 
};

export const deleteInfoRole = async (ids: number[]): Promise<any> => {
    try {
        await Role.destroy({ where: { id: ids } });
        await RolePermission.destroy({ where: { roleId: ids } });
        return { message: 'Roles deleted successfully' };
    } catch (error) {
        console.error('Error deleting roles:', error);
        throw error;
    } 
};