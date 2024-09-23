import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../types/express';
import Role from '../models/roleModel';
import RolePermission from '../models/rolePermissionModel';
import Permission from '../models/permissionModel';
import ApiEndpoint from '../models/apiEndpointModel';

// Define User interface
interface User {
    id: number;
    name: string;
    permissions: string[];
    role: string[];
}

// Type the Role model with the included associations
interface RoleWithPermissions extends Role {
    rolePermission: RolePermission[];
}

// Authorize middleware function
export const authorize = (requiredRole: string) => {
    return async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        try {
            const user = req.user as User;
            if (!user) return res.status(401).json({ message: 'Unauthorized' });

            const requestPath = req.originalUrl.split('?')[0];

            const roleRecord = await Role.findOne({
                where: { name: user.role },
                include: [{
                    model: RolePermission,
                    include: [{
                        model: Permission,
                        include: [ApiEndpoint]
                    }]
                }]
            }) as RoleWithPermissions;

            if (!roleRecord) return res.status(404).json({ message: 'Role not found' });

            const permissionsList = roleRecord.rolePermission?.map((rp: RolePermission) => rp.permission) || [];

            if (permissionsList.length === 0) {
                return res.status(403).json({ message: 'No permissions found for this role' });
            }

            const apiEndpoints = permissionsList.map((permission: Permission) => permission.apiEndpoint?.path);

            const normalizePath = (path: string): string => {
                return path.replace(/:\w+/g, '[^/]+'); // Replace dynamic segments with a regex pattern
              };
              
            const hasApiAccess = (requestPath: string, endpoints: string[]): boolean => {
              return endpoints.some(endpoint => {
                const regex = new RegExp(`^${normalizePath(endpoint)}$`);
                return regex.test(requestPath);
              });
            };
              
            const accessGranted = hasApiAccess(requestPath, apiEndpoints);

            if (!accessGranted) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions or roles' });
            }

            next();
        } catch (error) {
            console.error('Authorization error:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    };
};
