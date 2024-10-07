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
const express_1 = require("express");
const uploadRouter = (0, express_1.Router)();
uploadRouter.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file && req.file.filename) {
        const fileUrl = `http://localhost:5000/${req.file.filename}`;
        res.json({ url: fileUrl });
    }
    else {
        res.status(400).json({ error: 'No file uploaded' });
    }
}));
exports.default = uploadRouter;
