"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRole = exports.getRole = exports.index = void 0;
// import { list, createInfoRole, updateInfoRole, deleteInfoRole } from "../services/roleService";
const roleService_1 = require("../services/roleService");
const responseUtils_1 = require("../utils/responseUtils");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, search } = req.query;
    const Roles = yield (0, roleService_1.list)(page, limit, search);
    (0, responseUtils_1.ok)(res, Roles);
});
exports.index = index;
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const user = yield (0, roleService_1.getRoleId)(id);
    (0, responseUtils_1.ok)(res, user);
});
exports.getRole = getRole;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield (0, roleService_1.createInfoRole)(data);
    (0, responseUtils_1.ok)(res, result);
});
exports.createRole = createRole;
// export const updateRole = async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     const Role = req.body;
//     const result = await updateInfoRole(id, Role);
//     ok(res, result);
// };
// export const deleteRole = async (req: Request, res: Response): Promise<void> => {
//     const { ids } = req.body;
//     await deleteInfoRole(ids);
//     ok(res, {
//         message: "Roles deleted successfully",
//       });
// }
