import { Request, Response } from "express"
import { prisma } from "../database/prisma"
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, accessName } = req.body;

    const isUniqueEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    const isAccesssName = await prisma.access.findUnique({
        where: {
            name: accessName
        }
    })

    if (!isAccesssName) {
        return res.status(400).json({ message: "Access name doesn't exist" })
    }

    if (isUniqueEmail) {
        return res.status(400).json({ message: "User email alredy exists" })
    }

    const hashPassword = await hash(password, 8)

    const user = await prisma.user.create({
        data: { name, email, password: hashPassword, Access: {
            connect: {
                name: accessName
            }
        } },
        select: {
            id: true,
            name: true,
            email: true,
            Access: {
                select: {
                    name: true
                }
            }
        }
    });

    return res.json(user);
}

export const deleteAllUsers = async (req: Request, res: Response) => {

    await prisma.user.deleteMany()

    return res.json({ message: "All users deleted" })
}