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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Define_1 = __importDefault(require("../utils/Define"));
const MyResponse_1 = __importDefault(require("../models/MyResponse"));
const Helper_1 = __importDefault(require("../utils/Helper"));
const AuthController = {
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, name, password } = req.body;
            if (!email || !password || !name) {
                throw new Error("Enter name,email,password");
            }
            if (password.length < 6) {
                throw new Error("Password Length Should be More than 5 character.");
            }
            //get hash pass & save new user into db
            const hashpass = yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(10));
            //create the new user.
            const user = yield req.prisma.users.create({
                data: {
                    name: name,
                    email,
                    password: hashpass
                }
            });
            //get token and set into cookie
            const token = Helper_1.default.getJWTtoken(user.id);
            //send token in http cookie with no expire
            res.cookie(Define_1.default.TOKEN, token, Helper_1.default.getSessionCookieOption(req.agent));
            res.status(200).json((0, MyResponse_1.default)("user created successfully", user));
        }
        catch (e) {
            console.log("auth sign up: ", e);
            res.status(500).json((0, MyResponse_1.default)(e.message));
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            //validatioin
            if (!email || !password) {
                throw new Error("Enter email,password");
            }
            //check user is available or not in db
            const u = yield req.prisma.users.findUnique({
                where: {
                    email: email
                }
            });
            if (!u) {
                throw new Error("No User Found with this email!");
            }
            const user = u;
            //validate password
            const ckPass = yield bcryptjs_1.default.compare(password, user.password);
            if (!ckPass) {
                throw new Error("Wrong email or password");
            }
            //get token and set into cookie
            const token = Helper_1.default.getJWTtoken(user.id);
            //send token in http cookie with no expire
            res.cookie(Define_1.default.TOKEN, token, Helper_1.default.getSessionCookieOption(req.agent));
            res.status(200).json((0, MyResponse_1.default)("user loggedin successfully", user));
        }
        catch (e) {
            console.log("auth login: ", e);
            res.status(500).json((0, MyResponse_1.default)(e.message));
        }
    }),
    logout: (req, res) => {
        res.cookie(Define_1.default.TOKEN, "", {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(0)
        });
        res.status(200).json((0, MyResponse_1.default)("user logged out", true));
    },
    getLoggedInUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //check user is available or not in db
            const u = yield req.prisma.users.findUnique({
                where: {
                    id: req.userId
                }
            });
            if (!u) {
                throw new Error("No User Found!");
            }
            const user = u;
            res.status(200).json((0, MyResponse_1.default)("got user successfully", user));
        }
        catch (e) {
            console.log("auth getUserById: ", e);
            res.status(500).json((0, MyResponse_1.default)(e.message));
        }
    }),
};
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map