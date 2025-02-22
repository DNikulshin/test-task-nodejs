import { ValidationError } from "express-validator"

export class ApiError extends Error   {
    status: number
    errors: never[] | ValidationError[]

    constructor(status: number, message: string, errors: never[] | ValidationError[]= []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message = '', errors: never[] | ValidationError[] = []) {
        return new ApiError(400, message, errors)

    }
}