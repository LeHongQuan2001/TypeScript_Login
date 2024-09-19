import { Op } from 'sequelize';
import ApiEndpoint from '../models/apiEndpointModel';
import Permission from '../models/permissionModel';

export const list = async (): Promise<any> => {
    const apiEndpoints = await ApiEndpoint.findAll();
    return { apiEndpoints };
}

export const getFullList = async (): Promise<any> => {
    const existingApiEndpointIds = await Permission.findAll({
        attributes: ['apiId'],
        raw: true
    }).then(permissions => permissions.map(permission => permission.apiId));

    const apiEndpoints = await ApiEndpoint.findAll({
        where: {
            id: {
                [Op.notIn]: existingApiEndpointIds
            }
        }
    });

    return { apiEndpoints };
};
