import User from '../models/userModel';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
        return {
            id: user.id,
            email: user.email,
            token: generateToken(user.id.toString()),
        };
    }
    throw new Error('Invalid credentials');
};
