
export class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "Validation Error"
        this.status = 400
    }
}

export class ForbiddenError extends Error {
    constructor(message) {
        super(message)
        this.name = "Forbidden Error"
        this.status = 403
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "Not Found Error"
        this.status = 404
    }
}

export const handleError = (res, errorMessage, errorStatus, errorName) => {
    res.status(errorStatus).json({
        success: false,
        name: errorName,
        message: errorMessage
    })
}