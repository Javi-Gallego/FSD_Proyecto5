import User from "./user.model.js"

export const getUsersRepository = async (skip, limit) => {

    const users = await User.find().select("-password").skip(skip).limit(limit)

    return users
}