"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Helper = {
    getJWTtoken: (uid) => {
        return jsonwebtoken_1.default.sign({
            userId: uid
        }, process.env.JWT_SECRET + '');
    },
    verifyJWTtoken: (token) => {
        try {
            if (!token) {
                throw new Error("Unauthorized Access");
            }
            const jwtpayload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET + "");
            const payload = jwtpayload;
            return payload.userId;
        }
        catch (e) {
            throw new Error("Unauthorized Access");
        }
    },
    getSessionCookieOption: (agent = "android") => {
        //3rd party= secure: true && sameSite: 'none'
        //1st party= secure: true/false && samesite:'lax'
        //dev
        //secure: false && sameSite: 'lax'
        //produciton
        //secure: true && sameSite: 'lax' (1st party)
        //secure: true && sameSite: 'none' (3rd party)
        if (agent == "browser") {
            return {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development' ? true : true,
                sameSite: 'none',
                maxAge: 365 * 24 * 60 * 60 * 1000 //365*1 day in milis
            };
        }
        if (agent == "postman") {
            return {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development' ? false : true,
                sameSite: 'none',
                maxAge: 365 * 24 * 60 * 60 * 1000 //365*1 day in milis
            };
        }
        else { //mobile
            return {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development' ? false : true,
                sameSite: 'none', //lax or none
                //maxAge: 1 * 24 * 60 * 60 * 1000//
            };
        }
    }
};
exports.default = Helper;
//# sourceMappingURL=Helper.js.map