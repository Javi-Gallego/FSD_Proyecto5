import { getUsersRepository } from "./user.repository.js"

export const getUsersService = async (req) => {
    const skip = req.body.skip || 0
    const limit = req.body.limit || 10

    const users = await getUsersRepository(skip, limit)

    return users
}