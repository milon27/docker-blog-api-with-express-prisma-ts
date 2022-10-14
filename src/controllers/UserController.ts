import { User } from "@prisma/client"
import { Request, Response } from "express"
import MyResponse from "../models/MyResponse"
import Define from "../utils/Define"
import Helper from "../utils/Helper"

const UserController = {
    getAllByPaginate: async (req: Request, res: Response) => {
        try {
            const page = req.query.page as string || "1"
            const skip = (parseInt(page) - 1) * Define.PAGE_SIZE
            if (isNaN(skip)) {
                throw new Error("Enter Valid Page Number!")
            }
            const list = await req.prisma.user.findMany({
                skip: skip,
                take: Define.PAGE_SIZE,
                orderBy: {
                    createdAt: "desc"
                }
            })
            res.status(200).json(MyResponse<User[]>(false, "get data successfully", list))
        } catch (e) {
            console.log("getAllByPaginate: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    createUser: async (req: Request, res: Response) => {
        // try {
        //     const { title, desc } = req.body as UserDto
        //     const user = await req.prisma.user.create({
        //         data: {
        //             title, desc
        //         }
        //     })
        //     res.status(200).json(MyResponse<User>(false, "created successfully", user))
        // } catch (e) {
        //     console.log("createUser: ", e)
        //     Helper.sendErrorResponse(res, e)
        // }
        res.send("Coming Soon")
    },
    updateUser: async (req: Request, res: Response) => {
        // try {
        //     const { id } = req.params
        //     const { title, desc } = req.body as Partial<UserDto>
        //     const user = await req.prisma.user.update({
        //         data: {
        //             title: title || undefined,
        //             desc: desc || undefined
        //         },
        //         where: {
        //             id: id
        //         }
        //     })
        //     res.status(200).json(MyResponse<User>(false, "updated successfully", user))
        // } catch (e) {
        //     console.log("updateUser: ", e)
        //     Helper.sendErrorResponse(res, e)
        // }
        res.send("Coming Soon")
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