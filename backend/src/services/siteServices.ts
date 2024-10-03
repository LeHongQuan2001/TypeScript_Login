import config from "../configs";
import ApiEndpoint from "../models/apiEndpointModel";
import Language from "../models/languageModel";
import Permission from "../models/permissionModel";
import Role from "../models/roleModel";
import RolePermission from "../models/rolePermissionModel";
import JWT from "jsonwebtoken";

export const listLanguages = async (): Promise<any> => {
  const languages = await Language.findAll();
  return { languages };
};

export const listPermissions = async (data: string): Promise<any> => {
  const token = data.split(" ")[1];
  
  const user = await new Promise<any>((resolve, reject) => {
    JWT.verify(token, config.jwt.secret, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });

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
            attributes: ["id", "name", "apiId", "groupId"],
            include: [
              {
                model: ApiEndpoint,
                as: 'apiEndpoint',
                attributes: ["path"]
              }
            ]
          }
        ]
      }
    ],
    where: { name: user.role },
  });

  const apiPaths = roles.flatMap(role =>
    role.rolePermission.map(rp => rp.permission.apiEndpoint?.path)
  );

  return { apiPaths };
};

export const listRoles = async (): Promise<any> => {
  const roles = await Role.findAll();
  return { roles };
}