import { Router } from "express";
import MyResponse from "../models/MyResponse";
const TestRouter = Router()

/**
 * @description db connection check
 * @get http://localhost:2727/test/db
 */
TestRouter.get('/db', async (req, res) => {
    try {
        const result = await req.prisma.$queryRaw`select now()`
        res.status(200).send(MyResponse(false, "db connected", result))
    } catch (e) {
        console.log(e);
        res.status(500).send(MyResponse(true, `db not connected ${(e as Error).message}`, undefined))
    }
})

export default TestRouter