import config from '../configs';
import jwt from 'jsonwebtoken';

export const sign = (userId: any, userRole: any): string => {
    const access_token = jwt.sign(
        { userId, role: userRole },
        '8016af4e64e81ae37679660bdc1de8a028c0edf7bdb234d7d31ff3ac14a3c589',
        {
            algorithm: 'HS512',
            expiresIn: config.jwt.ttl,
        }
    );
    return access_token;
};

export const signRefreshToken = (userId: any, userRole: any): string => {
    const refresh_token = jwt.sign(
        { userId, role: userRole },
        config.jwt.secret,
        {
            expiresIn: "1y",
        }
    );
    return refresh_token;
};
