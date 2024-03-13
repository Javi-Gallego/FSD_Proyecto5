import { deactivateUserService, deleteUserService, followService, getProfileService, getUsersService, updateProfileService, updateRoleService } from "./user.service.js"
import { ForbiddenError, NotFoundError, ValidationError, handleError } from "../../utils/handleError.js"

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService(req)

        res.status(200).json({
            success: true,
            message: "Users retrieved succesfully",
            data: users
        })
    } catch (error) {
        if (error instanceof NotFoundError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Cant retrieve users", 500, error.message)
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
        if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof ForbiddenError) {
            return handleError(res, error.message, error.status, error.name)
        }
        // if (error.message === "User is not active") {
        //     return handleError(res, error.message, 400)
        // }
        handleError(res, "Cant retrieve profile", 500, error.message) //500 por defecto en la definicion de la funcion
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
        if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof ForbiddenError) {
            return handleError(res, error.message, error.status, error.name)
        }
        // if (error.message === "No data to update" || 
        //     error.message === "Both currentPassword and newPassword must be provided" ||
        //     error.message === "User is not active" ||
        //     error.message === "User not found" ||
        //     error.message === "Current password is incorrect" ||
        //     error.message === "Profile not found" ||
        //     error.message === "Email already in use" ||
        //     error.message === "User name already in use") {
        //     return handleError(res, error.message, 400)
        // }
        handleError(res, "Cant update profile", 500, error.message)
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
        if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof ForbiddenError) {
            return handleError(res, error.message, error.status, error.name)
        }
        // if (error.message === "User is already active and can't be deleted" ||
        //     error.message === "User not found") {
        //     return handleError(res, error.message, 400)
        // }
        handleError(res, "Cant delete user", 500, error.message)
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
        if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof ForbiddenError) {
            return handleError(res, error.message, error.status, error.name)
        }
        // if (error.message === "Role must be either user or admin" ||
        //     error.message === "User not found" ||
        //     error.message === "User is not active") {
        //     return handleError(res, error.message, 400)
        // }
        handleError(res, "Cant change role", 500, error.message)
    }
}

export const follow = async (req, res) => {
    try {
        const profile = await followService(req)

        res.status(200).json({
            success: true,
            message: "Followed/unfollowed succesfully",
            data: profile
        })
    } catch (error) {
        if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof ForbiddenError) {
            return handleError(res, error.message, error.status, error.name)
        }
        // if (error.message === "User not found" ||
        //     error.message === "User is not active" ||
        //     error.message === "You can't follow yourself") {
        //     return handleError(res, error.message, 400)
        // }
        handleError(res, "Cant follow/unfollow user", 500, error.message)
    }
}

export const deactivateUser = async (req, res) => {
    try {
        const profile = await deactivateUserService(req)

        res.status(200).json({
            success: true,
            message: "User deactivated succesfully",
            data: profile
        })
    } catch (error) {
        if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof ForbiddenError) {
            return handleError(res, error.message, error.status, error.name)
        }
        // if (error.message === "User is already inactive" ||
        //     error.message === "User not found") {
        //     return handleError(res, error.message, 400)
        // }
        handleError(res, "Cant deactivate user", 500, error.message)
    }
}