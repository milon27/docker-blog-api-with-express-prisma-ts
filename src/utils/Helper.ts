import { CookieOptions } from 'express'
import jwt from 'jsonwebtoken'

const Helper = {
    getJWTtoken: (uid: string) => {
        return jwt.sign({
            userId: uid
        }, process.env.JWT_SECRET + '')
    },
    verifyJWTtoken: (token: string): string => {
        try {
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            const jwtpayload = jwt.verify(token, process.env.JWT_SECRET + "")
            const payload = jwtpayload as jwt.JwtPayload
            return payload.userId as string
        } catch (e) {
            throw new Error("Unauthorized Access")
        }
    },
    getSessionCookieOption: (agent: "android" | "browser" | "postman" = "android") => {
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
                sameSite: 'none',//lax or none
                maxAge: 365 * 24 * 60 * 60 * 1000//365*1 day in milis
            } as CookieOptions

        }
        if (agent == "postman") {
            return {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development' ? false : true,
                sameSite: 'none',//lax or none
                maxAge: 365 * 24 * 60 * 60 * 1000//365*1 day in milis
            } as CookieOptions
        }
        else {//mobile
            return {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development' ? false : true,
                sameSite: 'none',//lax or none
                //maxAge: 1 * 24 * 60 * 60 * 1000//
            } as CookieOptions
        }
    }

}
export default Helper