export const handleError = (res, errorMessage, statusErrorCode = 500) => {   
    return res.status(statusErrorCode).json({
        success: false,
        message: errorMessage   
    })
}