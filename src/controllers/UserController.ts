import { User } from "@prisma/client"
import { Request, Response } from "express"
import { SignUpDto } from "../models/dto/AuthDto"
import MyResponse from "../models/MyResponse"
import Define from "../utils/Define"
import Helper from "../utils/Helper"
import bcryptjs from "bcryptjs"

const UserController = {
    getAllByPaginate: async (req: Request, res: Response) => {
        try {
            const page = req.query.page as string || "1"
            const skip = (parseInt(page) - 1) * Define.PAGE_SIZE
            if (isNaN(skip)) {
                throw new Error("Enter Valid Page Number!")
            }
            const count = await req.prisma.user.count()
            const list = await req.prisma.user.findMany({
                skip: skip,
                take: Define.PAGE_SIZE,
                orderBy: {
                    createdAt: "desc"
                }
            })
            res.status(200).json(MyResponse<User[]>(false, "get data successfully", list, Math.ceil(count / Define.PAGE_SIZE)))
        } catch (e) {
            console.log("getAllByPaginate: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    getSingleUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const user = await req.prisma.user.findFirst({
                where: {
                    id: id
                }
            })
            if (!user) {
                throw new Error("No User Found!")
            }
            res.status(200).json(MyResponse<User>(false, "get data successfully", user))
        } catch (e) {
            console.log("getSingleUser: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    createUser: async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, userName, email, password, avatar, bio, role, address, phone, isVerified } = req.body as SignUpDto
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
                    isVerified,
                    bio,
                    role: {
                        connect: {
                            title: role
                        }
                    },
                    address,
                    phone
                }
            })
            res.status(200).json(MyResponse<User>(false, "created successfully", user))
        } catch (e) {
            console.log("createUser: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    updateUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { firstName, lastName, userName, email, password, avatar, bio, role, address, phone, isVerified, lastLoggedIn } = req.body as Partial<SignUpDto>

            //get hash pass & save new user into db
            const hashpass = password ? await bcryptjs.hash(password, await bcryptjs.genSalt(10)) : undefined

            const user = await req.prisma.user.update({
                data: {
                    firstName,
                    lastName,
                    userName: userName ? userName.toLowerCase().trim() : undefined,
                    email: email ? email.toLowerCase().trim() : undefined,
                    password: hashpass,
                    isVerified, bio,
                    avatar, address, phone,
                    roleTitle: role,
                    lastLoggedIn
                },
                where: {
                    id: id
                }
            })
            res.status(200).json(MyResponse<User>(false, "updated successfully", user))
        } catch (e) {
            console.log("updateUser: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    deleteUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const user = await req.prisma.user.delete({
                where: {
                    id: id
                }
            })
            res.status(200).json(MyResponse<User>(false, "deleted successfully", user))
        } catch (e) {
            console.log("deleteUser: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
}
export default UserController