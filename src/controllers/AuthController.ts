import { Request, Response } from "express"
import { User } from "@prisma/client"
import bcryptjs from 'bcryptjs'
import Define from "../utils/Define"
import MyResponse from "../models/MyResponse"
import Helper from "../utils/Helper"
import { LoginDto, SignUpDto } from "../models/dto/AuthDto"

const AuthController = {
    signUp: async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, userName, email, password, avatar, role, address, phone } = req.body as SignUpDto
            //get hash pass & save new user into db
            const hashpass = await bcryptjs.hash(password, await bcryptjs.genSalt(10))

            //create the new user.
            const user = await req.prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    userName: userName.toLowerCase().trim(),
                    email: email.toLowerCase().trim(),
                    password: hashpass,
                    avatar,
                    role: {
                        connect: {
                            title: role
                        }
                    },
                    address,
                    phone
                }
            })

            //get token and set into cookie
            const token = Helper.getJWTtoken(user.id)
            //send token in http cookie with no expire
            res.cookie(Define.TOKEN, token, Helper.getSessionCookieOption(req.agent))
            res.status(200).json(MyResponse<User>(false, "user created successfully", user))
        } catch (e) {
            console.log("auth sign up: ", JSON.stringify(e, null, 2));
            Helper.sendErrorResponse(res, e)
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body as LoginDto
            //check user is available or not in db
            const u = await req.prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            if (!u) {
                throw new Error("No User Found with this email!")
            }
            const user = u!
            //validate password
            const ckPass = await bcryptjs.compare(password, user.password)
            if (!ckPass) {
                throw new Error("Wrong email or password")
            }
            //get token and set into cookie
            const token = Helper.getJWTtoken(user.id)
            //send token in http cookie with no expire
            res.cookie(Define.TOKEN, token, Helper.getSessionCookieOption(req.agent))
            res.status(200).json(MyResponse<User>(false, "user loggedin successfully", user))
        } catch (e) {
            console.log("auth login: ", e);
            Helper.sendErrorResponse(res, e)
        }
    },
    logout: (req: Request, res: Response) => {
        res.cookie(Define.TOKEN, "", {
            httpOnly: true,
            secure: true,
            sameSite: 'none',//lax or none
            expires: new Date(0)
        })
        res.status(200).json(MyResponse(false, "user logged out", true))
    },
    getLoggedInUser: async (req: Request, res: Response) => {
        try {
            //check user is available or not in db
            const u = await req.prisma.user.findUnique({
                where: {
                    id: req.userId
                }
            })
            if (!u) {
                throw new Error("No User Found!")
            }
            const user = u!
            res.status(200).json(MyResponse<User>(false, "got user successfully", user))
        } catch (e) {
            console.log("auth getUserById: ", e);
            Helper.sendErrorResponse(res, e)
        }
    },
}
export default AuthController