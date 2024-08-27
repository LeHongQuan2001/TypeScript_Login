import User from '../models/userModel';
import Role from '../models/roleModel';
import bcrypt from 'bcrypt';
import { sign } from '../utils/jwtUtils';

interface AuthenticatedUser {
    id: number;
    email: string;
    access_token: string;
}

export const loginUser = async (email: string, password: string): Promise<AuthenticatedUser> => {
    const user = await User.findOne({ where: { email } });
    console.log('user', user);
    if (user && await bcrypt.compare(password, user.password)) {
        const role = await Role.findOne({ where: { id: user.role_id } });
        return {
            id: user.id,
            email: user.email,
            access_token: sign(user.id.toString(), role?.name),
        };
    }
    throw new Error('Invalid credentials');
};
