export const errorHandler = (err, req, res, next) => {
    if (err instanceof customError) {
        res.status(err.status).json({ error: err.message })
    }
    return res.status(500).json({ error: "Internal server error" })
}

export class customError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = this.constructor.name
        this.status = status
        Error.captureStackTrace(this, this.constructor);
    }
}

