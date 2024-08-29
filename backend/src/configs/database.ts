import { Sequelize } from 'sequelize-typescript';
import config from './config';
import User from '../models/userModel';
import { Config, DBConfig } from './config';
import Role from '../models/roleModel';
import UserPermission from '../models/userPermissionModel';
import Permission from '../models/permissionModel';
import Language from '../models/languageModel';

const environment: keyof Config = (process.env.DATABASE_ENV as keyof Config) || "development";
const dbConfig: DBConfig = config[environment] as DBConfig;

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  dialectOptions: dbConfig.dialectOptions,
  models: [ User, Role, UserPermission, Permission, Language ],
  logging: true,
});

export default sequelize;
