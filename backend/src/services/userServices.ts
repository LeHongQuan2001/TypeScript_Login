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

export const list = async (page: string = '1', limit: string = '10', search: string = ''): Promise<any> => {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const pageNo = isNaN(pageNumber) ? 1 : pageNumber;
  const limitNo = isNaN(limitNumber) ? 10 : limitNumber;

  let users;
    if (search && search != "") {
      const valueLowCase = search.toLowerCase();
      users = await User.findAll({
        include: {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
        where: {
          [Op.or]: [
            Sequelize.literal(
              `MATCH(username, email, phone) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
            ),
          ],
        },
      });
    } else {
      users = await User.findAll({
        include: { model: Role, as: "role", attributes: ["id", "name"] },
      });
    }

    // pagination
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
    const hashPW = await bcrypt.hash(user.password, 10);
    user.password = hashPW;
    const users = await User.create(user);
    return users;
};
