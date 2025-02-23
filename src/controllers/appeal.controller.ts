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


            const appeal = await appealService.update(id, { ...req.body })

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

            const { startDate, endDate } = req.query

            const appeals = await appealService.getAll(startDate?.toString(), endDate?.toString())
            res.json(appeals)

        } catch (e) {
            next(e)

        }
    }

    async cancelAllAtWork(req: Request, res: Response, next: NextFunction) {

        try {
            const appeals = await appealService.cancelAllInWork()
            res.json(appeals)

        } catch (e) {
            next(e)

        }
    }

}

export default new AppealController()