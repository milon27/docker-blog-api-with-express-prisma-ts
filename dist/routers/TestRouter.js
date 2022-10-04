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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MyResponse_1 = __importDefault(require("../models/MyResponse"));
const TestRouter = (0, express_1.Router)();
/**
 * @description db connection check
 * @get http://localhost:2727/test/db
 */
TestRouter.get('/db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield req.prisma.$queryRaw `select now()`;
        res.status(200).send((0, MyResponse_1.default)("db connected", result));
    }
    catch (e) {
        console.log(e);
        res.status(500).send((0, MyResponse_1.default)(`db not connected ${e.message}`));
    }
}));
exports.default = TestRouter;
//# sourceMappingURL=TestRouter.js.map