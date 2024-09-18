import { Sequelize } from 'sequelize-typescript';
import config from './config';
import User from '../models/userModel';
import { Config, DBConfig } from './config';
import Role from '../models/roleModel';
import Permission from '../models/permissionModel';
import Language from '../models/languageModel';
import GroupPermission from '../models/groupPermissionModel';
import RolePermission from '../models/rolePermissionModel';
import ApiEndpoint from '../models/apiEndpointModel';

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
  models: [ User, Role, Permission, Language, GroupPermission, RolePermission, ApiEndpoint ],
  logging: true,
});

export default sequelize;
