import User from "./user.model.js"

export const getUsersAsSuperAdminRepository = async (name, skip, limit) => {

    const users = await User.find({ 
        role: new RegExp(name, 'i') })
        .select("-password")
        .skip(skip)
        .limit(limit)

    if (!users) {
        throw new Error("Users not found")
    }

    return users
}

export const getUsersAsUserRepository = async (name, skip, limit) => {

    const users = await User.find({ 
        role: new RegExp(name, 'i'),
        is_active: true  })
        .select("-password")
        .skip(skip)
        .limit(limit)

    if (!users) {
        throw new Error("Users not found")
    }

    return users
}

export const getProfileRepository = async (userId) => {

    const profile = await User.findById(userId).select("-password")

    if (!profile) {
        throw new Error("Profile not found")
    }

    return profile
}

export const checkUserIsActive = async (userId) => {
    const user = await User.findById(userId).select("is_active")
    
    if (!user) {
        throw new Error("User not found")
    }

    return user.is_active
}

export const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId)

    if (!user) {
        throw new Error("User not found")
    }

}