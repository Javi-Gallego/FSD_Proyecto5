import { ForbiddenError, ValidationError } from "../../utils/handleError.js"
import { emailInUse, userNameInUse } from "../auth/register.repository.js"
import { changePassword, checkUserIsActive, deactivateUserRepository, deleteUserRepository, getProfileRepository, getUsersAsSuperAdminRepository, getUsersAsUserRepository, updateProfileRepository, updateRoleRepository } from "./user.repository.js"

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
        throw new ForbiddenError("User is not active")
    }

    const profile = await getProfileRepository(userId)

    return profile
}

export const updateProfileService = async (body, tokenId) => {

    const userId = tokenId
    const { userName, firstName, lastName, email, currentPassword, newPassword, privacy } = body
    const data = {}
    
    if(!userName && !firstName && !lastName && !email && !currentPassword && !newPassword && !privacy) {
        throw new ValidationError("No data to update")
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
        throw new ValidationError("Both currentPassword and newPassword must be provided")
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
        throw new ForbiddenError("User is already active and can't be deleted")
    }

    const profile = await deleteUserRepository(userId)

    return profile
}

export const updateRoleService = async (req) => {
    const userId = req.params.id
    const role = req.body.role

    const isActive = await checkUserIsActive(userId)

    if (!isActive) {
        throw new ForbiddenError("User is not active")
    
    }
    if (role !== "admin" && role !== "user") {
        throw new ValidationError("Role must be either user or admin")
    }

    const profile = await updateRoleRepository(userId, role)

    return profile
}

export const followService = async (req, res) => {

    const userToFollowId = req.params.id
    const userFollowingId = req.tokenData.userId

    const isActive = await checkUserIsActive(userToFollowId)

    if (!isActive) {
        throw new ForbiddenError("User is not active")
    }

    if (userToFollowId === userFollowingId) {
        throw new ValidationError("You can't follow yourself")
    }

    const userToFollow = await getProfileRepository(userToFollowId)
    const userFollowing = await getProfileRepository(userFollowingId)

    if (userToFollow.followers.includes(userFollowingId)) { 
        userToFollow.followers.pull(userFollowingId)
        userFollowing.following.pull(userToFollowId)

    } else {
        userToFollow.followers.push(userFollowingId)
        userFollowing.following.push(userToFollowId)
    }
        
    await userFollowing.save()
    await userToFollow.save()

    return {userToFollow, userFollowing}
}

export const deactivateUserService = async (req) => {
    const userId = req.tokenData.userId

    const isActive = await checkUserIsActive(userId)

    if (!isActive) {
        throw new ValidationError("User is already inactive")
    }

    const profile = await deactivateUserRepository(userId)

    return profile
}