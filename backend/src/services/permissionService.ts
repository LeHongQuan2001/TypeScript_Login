import GroupPermission from "../models/groupPermissionModel";
import Permission from "../models/permissionModel";

export const list = async (): Promise<any> => {
    const permissions = await Permission.findAll(
        {
            include: [
                {
                    model: GroupPermission,
                    as: 'groupPermission',
                    attributes: ["id", "name"],
                }
            ],
            attributes: ['id', 'name']
        }
    );
    return permissions;
};
