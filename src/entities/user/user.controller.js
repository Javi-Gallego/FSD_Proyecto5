import { getProfileService, getUsersService, updateProfileService } from "./user.service.js"
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
        if (error.message === "Users not found") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant retrieve users", 500)
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
        if (error.message === "User is not active") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant retrieve profile", 500) //500 por defecto en la definicion de la funcion
    }
}

export const updateProfile = async (req, res) => {
    try {
        const profile = await updateProfileService(req)

        res.status(200).json({
            success: true,
            message: "Profile updated succesfully",
            data: profile
        })
    } catch (error) {
        if (error.message === "No data to update" || 
            error.message === "Both currentPassword and newPassword must be provided") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant update profile", 500)
    }
}

