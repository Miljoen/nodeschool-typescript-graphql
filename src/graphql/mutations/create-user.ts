import { prisma } from '../../../prisma/prisma'
import { pubSub } from '../../pub-sub'
import { UserInput } from '../../types'

export async function createUser(input: UserInput) {
    const user = await prisma.user.create({
        data: {
            name: input.name,
        },
    })

    pubSub.publish('USER_CREATED', {
        userCreated: user,
    })

    return user
}