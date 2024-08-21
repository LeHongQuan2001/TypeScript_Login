import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, 'your_jwt_secret', {
        expiresIn: '30d',
    });
};

export default generateToken;
