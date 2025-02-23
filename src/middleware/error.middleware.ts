import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../exeptions/api.error.js'

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err)

    if (err instanceof ApiError) {
         res.status(err.status).json({ message: err.message, errors: err.errors })
    }

     res.status(500).json({ message: 'Непредвиденная ошибка', errors: err.message })
}