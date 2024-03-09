import { getProfileService, getUsersService } from "./user.service.js"
import { handleError } from "../../utils/handleError.js"

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService(req)

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

export const getProfile = async (req, res) => {
    try {

        const profile = await getProfileService(req)

        res.status(200).json({
            success: true,
            message: "Profile retrieved succesfully",
            data: profile
        })
    } catch (error) {
        if (error.message === "Email and password are required" ||
            error.message === "Password must contain between 6 and 10 characters" ||
            error.message === "Email format is not valid" ||
            error.message === "Email or password invalid") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant retrieve profile", 500) //500 por defecto en la definicion de la funcion
    }
}

