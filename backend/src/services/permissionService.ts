import ApiEndpoint from "../models/apiEndpointModel";
import GroupPermission from "../models/groupPermissionModel";
import Permission from "../models/permissionModel";
import Role from "../models/roleModel";
import RolePermission from "../models/rolePermissionModel";

export const list = async (
  page: string = "1",
  limit: string = "10",
  search: string = "",
  role: string = "",
  status: string = ""
): Promise<any> => {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const pageNo = isNaN(pageNumber) ? 1 : pageNumber;
  const limitNo = isNaN(limitNumber) ? 10 : limitNumber;
  const permissions = await Permission.findAll({
    include: [
      {
        model: GroupPermission,
        as: "groupPermission",
        attributes: ["id", "name"],
      },
      {
        model: RolePermission,
        as: "rolePermission",
        attributes: ["id"],
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: ApiEndpoint,
        as: "apiEndpoint",
        attributes: ["id", "description"],
      }
    ],
    attributes: ["id", "name"],
  });

  const startIndex = (pageNo - 1) * limitNo;
  const endIndex = pageNo * limitNo;
  const pages = Math.ceil(permissions.length / limitNo);
  const result = permissions.slice(startIndex, endIndex);

  return { result, pages };
};

export const getIdPerm = async (id: string): Promise<any> => {
  const permission = await Permission.findByPk(id, {
    include: [
      {
        model: GroupPermission,
        as: "groupPermission",
        attributes: ["id", "name"],
      }
    ]
  });
  return permission;
};

export const groupPermData = async (): Promise<any> => {
  const result = await GroupPermission.findAll();
  return result;
};

export const createInfoPerm = async (data: any): Promise<any> => {
  try {
    const { permissionName, apiEndpoint, groupPermission } = data;
    let groupPerm = await GroupPermission.findOne({ where: { id: groupPermission } });
    if (!groupPerm) {
      groupPerm = await GroupPermission.create({ name: groupPermission });
    }

    const permission = await Permission.findOne({ where: { name: permissionName } });
    if (!permission) {
      const result = await Permission.create({
        name: permissionName,
        apiId: apiEndpoint,
        groupId: groupPerm.id
      });

      return result;
    } else {
      throw new Error("Permission already exists");
    }

  } catch (error) {
    console.error("Error creating permission:", error);
    throw error;
  }
};

export const updateInfoPerm = async (id: string, data: any): Promise<any> => {
  try {
    const { editPermissionName, editApiEndpoint, groupPermission } = data;
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error("Permission not found");
    }
    if (editPermissionName && groupPermission && editApiEndpoint) {
      permission.name = editPermissionName;
      permission.apiId = editApiEndpoint;
      const groupPerm = await GroupPermission.findByPk(groupPermission);
      if (!groupPerm) {
        throw new Error("Group permission not found");
      }
      permission.groupId = groupPerm.id;
    } else {
      throw new Error("No data to update");
    } 
    await permission.save();
    return permission;
  } catch (error) {
    console.error("Error updating permission:", error);
    throw error;
  }
};

export const deleteInfoPerm = async (ids: string[]): Promise<any> => {
  console.log('ids', ids);
  try {
    await Permission.destroy({ where: { id: ids } });
  } catch (error) {
    console.error("Error deleting permission:", error);
    throw error;
  }
}