import { deleteUserService, getProfileService, getUsersService, updateProfileService, updateRoleService } from "./user.service.js"
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
        const profile = await updateProfileService(req.body, req.tokenData.userId)

        res.status(200).json({
            success: true,
            message: "Profile updated succesfully",
            data: profile
        })
    } catch (error) {
        if (error.message === "No data to update" || 
            error.message === "Both currentPassword and newPassword must be provided" ||
            error.message === "User is not active" ||
            error.message === "User not found" ||
            error.message === "Current password is incorrect" ||
            error.message === "Profile not found" ||
            error.message === "Email already in use" ||
            error.message === "User name already in use") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant update profile", 500)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const profile = await deleteUserService(req)

        res.status(200).json({
            success: true,
            message: "Profile deleted succesfully",
            data: profile
        })
    } catch (error) {
        if (error.message === "User is already active and can't be deleted" ||
            error.message === "User not found") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant delete user", 500)
    }
}

export const updateRole = async (req, res) => {
    try {
        const profile = await updateRoleService(req)

        res.status(200).json({
            success: true,
            message: "Role updated succesfully",
            data: profile
        })
    } catch (error) {
        if (error.message === "Role must be either user or admin" ||
            error.message === "User not found" ||
            error.message === "User is not active") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant change role", 500)
    }
}