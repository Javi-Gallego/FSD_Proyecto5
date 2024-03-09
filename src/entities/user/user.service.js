import { checkUserIsActive, getProfileRepository, getUsersRepository } from "./user.repository.js"

export const getUsersService = async (req) => {
    const skip = req.body.skip || 0
    const limit = req.body.limit || 10

    const users = await getUsersRepository(skip, limit)

    return users
}

export const getProfileService = async (req) => {

    const userId = req.tokenData.userId

    const isActive = await checkUserIsActive(userId)

    if (!isActive) {
        throw new Error("User is not active")
    }

    const profile = await getProfileRepository(userId)

    return profile
}