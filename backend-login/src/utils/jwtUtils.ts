import config from '../configs';
import jwt from 'jsonwebtoken';

export const sign = (userId: any, userRole: any): string => {
    const access_token = jwt.sign(
        { userId, role: userRole },
        config.jwt.secret,
        {
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
