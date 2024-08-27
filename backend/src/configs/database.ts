import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  username: string;
  password: string | undefined;
  database: string;
  host: string;
  port: number;
  dialect: string;
  dialectOptions?: {
    bigNumberStrings: boolean;
    socketPath?: string;
    charset?: string;
  };
}

interface Config {
  environment: string;
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}

const config: Config = {
  environment: process.env.DATABASE_ENV || "development",
  
  development: {
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "root",
    database: process.env.DATABASE_NAME || "blogs",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
      socketPath: process.env.DATABASE_SOCKET || "",
    },
  },
  
  test: {
    username: process.env.DATABASE_TEST_USERNAME || "root",
    password: process.env.DATABASE_TEST_PASSWORD,
    database: process.env.DATABASE_TEST_NAME || "blogs",
    host: process.env.DATABASE_TEST_HOST || "127.0.0.1",
    port: Number(process.env.DATABASE_TEST_PORT) || 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
      socketPath: process.env.DATABASE_TEST_SOCKET || "",
      charset: "utf8mb4",
    },
  },
  
  production: {
    username: process.env.PROD_DB_USERNAME || "",
    password: process.env.PROD_DB_PASSWORD || "",
    database: process.env.PROD_DB_NAME || "",
    host: process.env.PROD_DB_HOSTNAME || "",
    port: Number(process.env.PROD_DB_PORT) || 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};

export default config;
