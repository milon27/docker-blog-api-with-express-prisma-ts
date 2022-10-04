declare namespace Express {
    type PrismaClient = import('@prisma/client').PrismaClient;

    export interface Request {
        userId: string
        prisma: PrismaClient
        agent: "android" | "browser" | "postman"
    }
}