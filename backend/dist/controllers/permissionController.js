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
exports.index = void 0;
const permissionService_1 = require("../services/permissionService");
const responseUtils_1 = require("../utils/responseUtils");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Permissions = yield (0, permissionService_1.list)();
    (0, responseUtils_1.ok)(res, Permissions);
});
exports.index = index;
// export const createRole = async (req: Request, res: Response): Promise<void> => {
//     const Role = req.body;
//     const result = await createInfoRole(Role);
//     ok(res, result);            
// };
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
