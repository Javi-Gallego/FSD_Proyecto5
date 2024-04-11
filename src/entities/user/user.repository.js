import { ForbiddenError, NotFoundError } from "../../utils/handleError.js"
import User from "./user.model.js"
import bcrypt from "bcrypt"

export const getUsersAsSuperAdminRepository = async (req, skip, limit) => {

    const { name, email, firstName, lastName , role} = req.body

    const users = await User.find({ 
        userName: new RegExp(name, 'i'),
        email: new RegExp(email, 'i'),
        firstName: new RegExp(firstName, 'i'),
        lastName: new RegExp(lastName, 'i'),
        role: new RegExp(role, 'i')})
        .select("-password")
        .populate("following", "userName -_id")
        .populate("followers", "userName -_id")
        .skip(skip)
        .limit(limit)

    if (users.length === 0) {
        throw new NotFoundError("Users not found")
    }

    return users
}

export const getUsersAsUserRepository = async (userName, skip, limit) => {

    const users = await User.find({ 
        userName: new RegExp(userName, 'i'),
        role: "user",
        is_active: true})
        .select("-passwordHash -email -updatedAt -is_active  -role -_id")
        .populate("following", "userName -_id")
        .populate("followers", "userName -_id")
        .skip(skip)
        .limit(limit)

    if (users.length === 0) {
        throw new NotFoundError("Users not found")
    }

    return users
}

export const getProfileRepository = async (userId) => {

    const profile = await User.findById(userId)
                                .select("-passwordHash")
                                .populate("following", "userName -_id")
                                .populate("followers", "userName -_id")

    if (!profile) {
        throw new NotFoundError("Profile not found")
    }

    return profile
}

export const checkUserIsActive = async (userId) => {
    const user = await User.findById(userId).select("is_active")

    if (!user) {
        throw new NotFoundError("User not found")
    }

    return user.is_active
}

export const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId)

    if (!user) {
        throw new NotFoundError("User not found")
    }

    if(!bcrypt.compareSync(currentPassword, user.passwordHash)){
        throw new ForbiddenError("Current password is incorrect")
    }

    const newPassHash = bcrypt.hashSync(newPassword, 5)

    return newPassHash
}

export const updateProfileRepository = async (userId, data) => {

    const profile = await User.findByIdAndUpdate(
                                userId, 
                                data, 
                                { new: true })
                                .select("-password")

    if (!profile) {
        throw new NotFoundError("Profile not found")
    }

    return profile
}

export const deleteUserRepository = async (userId) => {

    const deletedUser = await User.findByIdAndDelete(userId).select("-password")

    return deletedUser
}

export const updateRoleRepository = async (userId, role) => {

    const user = await User.findByIdAndUpdate(
                                userId, 
                                { role: role }, 
                                { new: true })
                                .select("-password")

    if (!user) {
        throw new NotFoundError("User not found")
    }

    return user
}

export const deactivateUserRepository = async (userId) => {
    
        const user = await User.findByIdAndUpdate(
                                    userId, 
                                    { is_active: false }, 
                                    { new: true })
                                    .select("-password")
    
        if (!user) {
            throw new NotFoundError("User not found")
        }
    
        return user
}

export const getUserByIdRepository = async (userId) => {

    const user = await User.find({ 
        _id: userId })
        .select("-password -following -followers -email -createdAt -updatedAt -role -_id")

    if (user.length === 0) {
        throw new NotFoundError("User not found")
    }

    return user
}

export const updateActiveRepository = async (userId) => {

    const user = await User.findByIdAndUpdate(
                                userId, 
                                { is_active: true }, 
                                { new: true })
                                .select("-password")

    if (!user) {
        throw new NotFoundError("User not found")
    }

    return user
}

export const getProfileFollowRepository = async (userId) => {

    const profile = await User.findById(userId)
                                .select("-passwordHash")
                                
    if (!profile) {
        throw new NotFoundError("Profile not found")
    }

    return profile
}