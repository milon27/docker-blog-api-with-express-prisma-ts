"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const AuthMid_1 = __importDefault(require("./middlewares/AuthMid"));
const AuthRouter = (0, express_1.Router)();
/**
 * @description create a new user then login user
 * @param { email:String, name:String, password:String } = req.body
 * @post http://localhost:2727/auth/signup
 */
AuthRouter.post('/signup', AuthController_1.default.signUp);
/**
 * @description login user
 * @param { email:String, password:String } = req.body
 * @post http://localhost:2727/auth/login
 */
AuthRouter.post('/login', AuthController_1.default.login);
/**
 * @description logout user
 * @get http://localhost:2727/auth/logout
 */
AuthRouter.get('/logout', AuthController_1.default.logout);
/**
 * @description get logged in user
 * @get http://localhost:2727/auth/user
 */
AuthRouter.get('/user', AuthMid_1.default, AuthController_1.default.getLoggedInUser);
exports.default = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map