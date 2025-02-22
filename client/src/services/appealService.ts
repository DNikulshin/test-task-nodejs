import { AxiosResponse } from "axios"
import $api from "../http/index.ts"
import { IAppeal } from "../models/Appeal.ts"

export default class AppealService {
    static async getAll(): Promise<AxiosResponse<IAppeal[]>> {

        return $api.get<IAppeal[]>('/all')

    }
    static async create(appeal: IAppeal): Promise<AxiosResponse<IAppeal>> {

        return $api.post<IAppeal>('/create', appeal)

    }

    static async update(appeal: IAppeal): Promise<AxiosResponse<IAppeal>> {

        return $api.patch<IAppeal>(`/update/${appeal.id}`, {
            ...appeal
        })

    }
}