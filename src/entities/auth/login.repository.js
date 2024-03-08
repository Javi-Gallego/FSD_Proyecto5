import User from "../user/user.model.js"

export const getUserByMail = async (email) => {
    const user = await User.findOne(
        {
            email: email
        }
    )

    return user
}