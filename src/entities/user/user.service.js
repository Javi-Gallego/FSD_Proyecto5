import User from "./user.model.js"
import { changePassword, checkUserIsActive, getProfileRepository, getUsersAsSuperAdminRepository, getUsersAsUserRepository } from "./user.repository.js"

export const getUsersService = async (req) => {
    const skip = req.body.skip || 0
    const limit = req.body.limit || 10
    const roleName = req.tokenData.roleName

    const userName = req.body.userName

    if (roleName === "super_admin") {
        const users = await getUsersAsSuperAdminRepository(req, skip, limit)
        return users
    }    

    if (roleName !== "super_admin") {

        const users = await getUsersAsUserRepository(userName, skip, limit)

        return users
    }
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

export const updateProfileService = async (req) => {
    const userId = req.tokenData.userId
    const { name, firstName, lastName, email, currentPassword, newPassword, privacy} = req.body
    const data = {}

    if(!name && !firstName && !lastName && !email && !currentPassword && !newPassword && !privacy) {
        throw new Error("No data to update")
    }

    if(name) {
        data.userName = name
    }

    if(firstName) {
        data.firstName = firstName
    }

    if(lastName) {
        data.lastName = lastName
    }

    if(email) {
        data.email = email
    }

    if(privacy === "public" || privacy === "private") {
        data.privacy = privacy
    }

    if( (currentPassword && !newPassword) ||
        (!currentPassword && newPassword) ){
        throw new Error("Both currentPassword and newPassword must be provided")
    }

    if(currentPassword && newPassword) {
        const updatedPass = await changePassword(userId, currentPassword, newPassword)
    }
    const profile = await User.findByIdAndUpdate(
        userId,
        data,
        { new: true }
    )

    return profile
}