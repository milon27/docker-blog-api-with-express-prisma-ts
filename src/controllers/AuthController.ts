import { Request, Response } from "express"
import { Users } from "@prisma/client"
import bcryptjs from 'bcryptjs'
import Define from "../utils/Define"
import MyResponse from "../models/MyResponse"
import Helper from "../utils/Helper"
import { LoginDto, SignUpDto } from "../models/dto/AuthDto"

const AuthController = {
    signUp: async (req: Request, res: Response) => {
        try {
            const { email, name, password } = req.body as SignUpDto
            //get hash pass & save new user into db
            const hashpass = await bcryptjs.hash(password, await bcryptjs.genSalt(10))

            //create the new user.
            const user = await req.prisma.users.create({
                data: {
                    name: name,
                    email,
                    password: hashpass
                }
            })

            //get token and set into cookie
            const token = Helper.getJWTtoken(user.id)
            //send token in http cookie with no expire
            res.cookie(Define.TOKEN, token, Helper.getSessionCookieOption(req.agent))
            res.status(200).json(MyResponse<Users>(false, "user created successfully", user))
        } catch (e) {
            console.log("auth sign up: ", e);
            res.status(500).json(MyResponse(true, (e as Error).message, undefined))
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body as LoginDto
            //check user is available or not in db
            const u = await req.prisma.users.findUnique({
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
            res.status(200).json(MyResponse<Users>(false, "user loggedin successfully", user))
        } catch (e) {
            console.log("auth login: ", e);
            res.status(500).json(MyResponse(true, (e as Error).message, undefined))
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
            const u = await req.prisma.users.findUnique({
                where: {
                    id: req.userId
                }
            })
            if (!u) {
                throw new Error("No User Found!")
            }
            const user = u!
            res.status(200).json(MyResponse<Users>(false, "got user successfully", user))
        } catch (e) {
            console.log("auth getUserById: ", e);
            res.status(500).json(MyResponse(true, (e as Error).message, undefined))
        }
    },
}
export default AuthController