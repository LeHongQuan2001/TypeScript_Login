import { Op } from 'sequelize';
import User from '../models/userModel';
import Role from '../models/roleModel';
import { Sequelize } from 'sequelize-typescript';
const bcrypt = require("bcryptjs");

interface ListOptions {
  page?: string;
  limit?: string;
  search?: string;
}

export const list = async (
  page: string = '1', 
  limit: string = '10', 
  search: string = '', 
  role: string = '', 
  status: string = ''
): Promise<any> => {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const pageNo = isNaN(pageNumber) ? 1 : pageNumber;
  const limitNo = isNaN(limitNumber) ? 10 : limitNumber;

  let whereConditions: any = {};

  if (search && search !== "") {
    console.log('search', search);
    const valueLowCase = search.toLowerCase();
    whereConditions = {
      ...whereConditions,
      [Op.or]: [
        Sequelize.literal(
          `MATCH(username, email, phone) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
        ),
      ],
    };
  }

  if (role && role !== "") {
    whereConditions = {
      ...whereConditions,
      role_id: role,
    };
  }

  if (status && status !== "") {
    whereConditions = {
      ...whereConditions,
      status: status,
    };
  }

  const users = await User.findAll({
    include: {
      model: Role,
      as: "role",
      attributes: ["id", "name"],
    },
    where: whereConditions,
  });

  // Pagination
  const startIndex = (pageNo - 1) * limitNo;
  const endIndex = pageNo * limitNo;
  const pages = Math.ceil(users.length / limitNo);
  const result = users.slice(startIndex, endIndex);

  if (result) return { result, pages };
  else throw new Error("Failed");
};

export const getUserId = async (id: string): Promise<any> => {
    const user = await User.findByPk(id, {
      include: { model: Role, as: "role", attributes: ["id", "name"] },
    });
    return user;
};

export const createNewUser = async (user: any): Promise<any> => {
  const existingUserByEmail = await User.findOne({ where: { email: user.email } });
  if (existingUserByEmail) {
    throw new Error('Email already exists');
  }

  const existingUserByPhone = await User.findOne({ where: { phone: user.phone } });
  if (existingUserByPhone) {
    throw new Error('Phone number already exists');
  }

  const hashPW = await bcrypt.hash(user.password, 10);
  user.password = hashPW;
  const newUser = await User.create(user);
  
  return newUser;
};

export const updateInfoUser = async (userId: string, user: any): Promise<any> => {
  if (user.password) {
      const hashPW = await bcrypt.hash(user.password, 10);
      user.password = hashPW;
  }
  const result = await User.update(user, {
    where: { id: userId },
  });
  return result;
};

export const deleteInfoUser = async (ids: string[]): Promise<any> => {
  await User.destroy({ where: { id: ids } });
    return { message: "Users deleted successfully" };
};
