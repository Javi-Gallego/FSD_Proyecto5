import User from "./user.model.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")

        res.status(200).json({
            success: true,
            message: "Users retrieved succesfully",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be retrieved",
            error: error.message
        })
    }
}

