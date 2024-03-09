import { emailInUse, userNameInUse } from "../auth/register.repository.js"
import { changePassword, checkUserIsActive, deleteUserRepository, getProfileRepository, getUsersAsSuperAdminRepository, getUsersAsUserRepository, updateProfileRepository, updateRoleRepository } from "./user.repository.js"

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

export const updateProfileService = async (body, tokenId) => {

    const userId = tokenId
    const { userName, firstName, lastName, email, currentPassword, newPassword, privacy } = body
    const data = {}
    
    if(!userName && !firstName && !lastName && !email && !currentPassword && !newPassword && !privacy) {
        throw new Error("No data to update")
    }

    if(userName) {
        const isUserName = await userNameInUse(userName)
        data.userName = userName
    }

    if(firstName) {
        data.firstName = firstName
    }

    if(lastName) {
        data.lastName = lastName
    }

    if(email) {
        const isEmail = await emailInUse(email)
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
        data.passwordHash = updatedPass
    }
    const profile = await updateProfileRepository(userId, data)

    return profile
}

export const deleteUserService = async (req) => {
    const userId = req.params.id

    const isActive = await checkUserIsActive(userId)

    if (isActive) {
        throw new Error("User is already active and can't be deleted")
    }

    const profile = await deleteUserRepository(userId)

    return profile
}

export const updateRoleService = async (req) => {
    const userId = req.params.id
    const role = req.body.role

    const isActive = await checkUserIsActive(userId)

    if (!isActive) {
        throw new Error("User is not active")
    
    }
    if (role !== "admin" && role !== "user") {
        throw new Error("Role must be either user or admin")
    }

    const profile = await updateRoleRepository(userId, role)

    return profile
}