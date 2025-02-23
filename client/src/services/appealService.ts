import { AxiosResponse } from "axios"
import $api from "../http/index.ts"
import { IAppeal } from "../models/Appeal.ts"

export default class AppealService {

    static async getAll(startDate?: string, endDate?: string): Promise<AxiosResponse<IAppeal[]>> {

        return await $api.get<IAppeal[]>('/all', {
            params: {
                startDate,
                endDate
            }
        })

    }
    static async create(appeal: IAppeal): Promise<AxiosResponse<IAppeal>> {

        return await $api.post<IAppeal>('/create', appeal)

    }

    static async update(appeal: IAppeal): Promise<AxiosResponse<IAppeal>> {

        return await $api.patch<IAppeal>(`/update/${appeal.id}`, {
            ...appeal
        })

    }
    static async cancelAllInWork(): Promise<AxiosResponse<IAppeal[]>> {
        return await $api.get<IAppeal[]>('/cancel-all-in-work')

    }
}