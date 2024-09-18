"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (requiredPermissions = [], requiredRoles = []) => {
    return (req, res, next) => {
        console.log('req.user', req);
        // const user = req.user as User;
        // if (!user) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }
        // const hasPermission = requiredPermissions.every(permission => 
        //     user.permissions.includes(permission)
        // );
        // const hasRole = requiredRoles.every(role => 
        //     user.roles.includes(role)
        // );
        // if (!hasPermission || !hasRole) {
        //     return res.status(403).json({ message: 'Forbidden: Insufficient permissions or roles' });
        // }
        next();
    };
};
exports.authorize = authorize;
