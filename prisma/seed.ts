import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const doSeed = async () => {
    // create initail roles
    await prisma.role.createMany({
        data: [
            {
                title: "admin",
                desc: "Have all access"
            }, {
                title: "cj", //citizen journalist
                desc: "Default Role for all user (citizen journalist)"
            }, {
                title: "editor",
                desc: "Indozone Employee Editor"
            }, {
                title: "writter",
                desc: "Indozone Employee Writter"
            }, {
                title: "reporter",
                desc: "Indozone Employee reporter"
            }, {
                title: "journalist",
                desc: "Indozone Employee journalist"
            },
        ]
    })
    // create a admin user
    await prisma.user.create({
        data: {
            firstName: "FName",
            lastName: "LName",
            userName: "admin",
            email: "admin@g.com",
            isVerified: false,
            password: "$2a$10$p6/G6J/0szH/nM7j2L095OVVOtl3aPSpRjdF.Ma3sTZBMUnTt1siC",//1234567
            avatar: "#",
            role: {
                connect: {
                    title: "admin"
                }
            },
            address: "Jakarta",
            phone: "2679906232"
        }
    })
}

doSeed().then(() => {
    console.log("seed done")
}).catch(e => {
    console.log("alredy seeded")
})