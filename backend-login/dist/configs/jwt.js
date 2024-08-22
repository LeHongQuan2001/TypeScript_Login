"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtConfig = {
    secret: process.env.JWT_SECRET || 'secret',
    ttl: '1y',
};
exports.default = jwtConfig;
