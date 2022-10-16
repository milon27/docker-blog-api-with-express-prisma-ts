import { Role } from "@prisma/client"
import { Request, Response } from "express"
import { RoleDto } from "../models/dto/RoleDto"
import MyResponse from "../models/MyResponse"
import Define from "../utils/Define"
import Helper from "../utils/Helper"

const RoleController = {
    getAllByPaginate: async (req: Request, res: Response) => {
        try {
            const page = req.query.page as string || "1"
            const skip = (parseInt(page) - 1) * Define.PAGE_SIZE
            if (isNaN(skip)) {
                throw new Error("Enter Valid Page Number!")
            }
            const count = await req.prisma.role.count()
            const list = await req.prisma.role.findMany({
                skip: skip,
                take: Define.PAGE_SIZE,
                orderBy: {
                    title: "asc"
                }
            })
            res.status(200).json(MyResponse<Role[]>(false, "get data successfully", list, Math.ceil(count / Define.PAGE_SIZE)))
        } catch (e) {
            console.log("getAllByPaginate: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    getSingleRole: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const item = await req.prisma.role.findFirst({
                where: {
                    title: id
                }
            })
            if (!item) {
                throw new Error("No Role Found!")
            }
            res.status(200).json(MyResponse<Role>(false, "get data successfully", item))
        } catch (e) {
            console.log("getSingleRole: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    createRole: async (req: Request, res: Response) => {
        try {
            const { title, desc } = req.body as RoleDto
            const role = await req.prisma.role.create({
                data: {
                    title, desc
                }
            })
            res.status(200).json(MyResponse<Role>(false, "created successfully", role))
        } catch (e) {
            console.log("createRole: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    updateRole: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { title, desc } = req.body as Partial<RoleDto>
            const role = await req.prisma.role.update({
                data: {
                    title: title || undefined,
                    desc: desc || undefined
                },
                where: {
                    title: id
                }
            })
            res.status(200).json(MyResponse<Role>(false, "updated successfully", role))
        } catch (e) {
            console.log("updateRole: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
    deleteRole: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const role = await req.prisma.role.delete({
                where: {
                    title: id
                }
            })
            res.status(200).json(MyResponse<Role>(false, "deleted successfully", role))
        } catch (e) {
            console.log("deleteRole: ", e)
            Helper.sendErrorResponse(res, e)
        }
    },
}
export default RoleController