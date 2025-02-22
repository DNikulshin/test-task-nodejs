import { Request, Response, NextFunction } from 'express'
import appealService from '../services/appeal.service.js'
import { validationResult } from 'express-validator'
import { ApiError } from '../exeptions/api.error.js'

class AppealController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { title, description } = req.body

            const appeal = await appealService.create({ title, description })
            console.log(appeal);

            res.json(appeal)

        } catch (e) {
            next(e)

        }
    }


    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const { id } = req.params
            console.log(req.params);


            const appeal = await appealService.update(id, { ...req.body })
            console.log(appeal);


            res.json(appeal)

        } catch (e) {
            next(e)

        }
    }


    async getAll(req: Request, res: Response, next: NextFunction) {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const appeals = await appealService.getAll()
            res.json(appeals)

        } catch (e) {
            next(e)

        }
    }

    // async removeUserByID(req: Request, res: Response, next: NextFunction) {
    //     const { id } = req.params
    //     try {

    //         const user = await appealService.removeUserByID(id)
    //         return res.json(user)

    //     } catch (e) {
    //         next(e)

    //     }
    // }

}

export default new AppealController()