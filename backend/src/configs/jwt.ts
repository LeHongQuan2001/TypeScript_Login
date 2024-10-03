interface JwtConfig {
    secret: string;
    ttl: string;
}

const jwtConfig: JwtConfig = {
    secret: process.env.JWT_SECRET || '8016af4e64e81ae37679660bdc1de8a028c0edf7bdb234d7d31ff3ac14a3c589',
    ttl: '1y',
};

export default jwtConfig;
