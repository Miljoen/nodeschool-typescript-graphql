import { prisma } from "../../../prisma/prisma";

export async function users() {
    return prisma.user.findMany()
}