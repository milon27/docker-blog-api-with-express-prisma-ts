import { Response, Request, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

const PrismaMid = (req: Request, res: Response, next: NextFunction) => {
    req.prisma = client
    next()
}
export default PrismaMid