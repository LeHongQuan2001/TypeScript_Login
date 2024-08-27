import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blogs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
