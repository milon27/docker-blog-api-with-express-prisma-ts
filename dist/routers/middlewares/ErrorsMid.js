"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MyResponse_1 = __importDefault(require("../../models/MyResponse"));
const NotFoundMid = (req, res, next) => {
    res.status(404).send((0, MyResponse_1.default)("Route Not Found"));
};
const ErrorMid = (err, req, res, next) => {
    res.status(500).send((0, MyResponse_1.default)(err.message));
};
const ErrorsMid = [NotFoundMid, ErrorMid];
exports.default = ErrorsMid;
//# sourceMappingURL=ErrorsMid.js.map