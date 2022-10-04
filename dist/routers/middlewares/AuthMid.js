"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Define_1 = __importDefault(require("./../../utils/Define"));
const Helper_1 = __importDefault(require("../../utils/Helper"));
const MyResponse_1 = __importDefault(require("../../models/MyResponse"));
const AuthMid = (req, res, next) => {
    try {
        const token = req.cookies[Define_1.default.TOKEN];
        if (!token) {
            throw new Error("Unauthorized Access");
        }
        //token validation
        const uid = Helper_1.default.verifyJWTtoken(token);
        // console.log("authmid: ", uid);
        //set user email in request
        req.userId = uid;
        next();
    }
    catch (e) {
        res.status(401).json((0, MyResponse_1.default)(e.message));
    }
};
exports.default = AuthMid;
//# sourceMappingURL=AuthMid.js.map