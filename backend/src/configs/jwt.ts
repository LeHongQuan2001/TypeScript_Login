interface JwtConfig {
    secret: string;
    ttl: string;
}

const jwtConfig: JwtConfig = {
    secret: process.env.JWT_SECRET || 'secret',
    ttl: '1y',
};

export default jwtConfig;
