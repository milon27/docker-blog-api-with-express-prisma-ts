import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const doSeed = async () => {

}

doSeed().then(() => {
    console.log("seed done")
}).catch(e => {
    console.log("alredy seeded")
})