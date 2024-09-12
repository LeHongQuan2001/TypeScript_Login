"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Failed = exports.userError = exports.invalidated = exports.unauthorized = exports.error = exports.notFound = exports.ok = void 0;
const ok = (res, data) => {
    return res.status(200).send({
        success: true,
        data,
        status: 200,
        message: "Successful",
    });
};
exports.ok = ok;
const notFound = (res) => {
    return res.status(404).send({
        success: false,
        status: 404,
        message: "Cannot find resources",
    });
};
exports.notFound = notFound;
const error = (res, message) => {
    return res.status(500).send({
        success: false,
        status: 500,
        message: message || "Internal server error",
    });
};
exports.error = error;
const unauthorized = (res, message) => {
    return res.status(401).send({
        success: false,
        status: 401,
        message: message || "Unauthorized",
    });
};
exports.unauthorized = unauthorized;
const invalidated = (res, errors) => {
    return res.status(422).send({
        success: false,
        status: 422,
        data: errors,
    });
};
exports.invalidated = invalidated;
const userError = (res, error) => {
    return res.status(404).send({
        success: false,
        status: 404,
        message: error,
    });
};
exports.userError = userError;
const Failed = (res, error) => {
    return res.status(409).send({
        success: false,
        status: 409,
        message: error,
    });
};
exports.Failed = Failed;
