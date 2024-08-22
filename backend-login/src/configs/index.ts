import appConfig from '../configs/app';
import databaseConfig from '../configs/database';
import hashingConfig from '../configs/hashing';
import jwtConfig from '../configs/jwt';

interface Config {
    app: typeof appConfig;
    database: typeof databaseConfig;
    jwt: typeof jwtConfig;
    hashing: typeof hashingConfig;
}

const config: Config = {
    app: appConfig,
    database: databaseConfig,
    jwt: jwtConfig,
    hashing: hashingConfig,
};

export default config;