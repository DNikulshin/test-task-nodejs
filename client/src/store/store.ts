import { create } from 'zustand'
import ErrorHandler from '../exeptions/ErrorHandler'
import { IAppeal } from '../models/Appeal.ts'
import AppealService from '../services/appealService.ts'

interface IStore {
    appeal: IAppeal,
    appealList: IAppeal[],
    getAll: (startDate?: string, endDate?: string) => Promise<IAppeal[]>,
    create: (appeal: IAppeal) => Promise<IAppeal>,
    update: (appeal: IAppeal) => Promise<IAppeal>
    cancelAllInWork: () => Promise<IAppeal[]>
    isLoading: boolean
    errors: IError[]
}

export interface IError {
    msg: string
    path?: string
    type?: string
    value?: string

}


export const useStore = create<IStore>()((set) => ({
    appeal: {
        id: '',
        title: '',
        description: ''
    },
    isLoading: false,
    errors: [],
    appealList: [],

    getAll: async (startDate, endDate) => {

        try {
            set({ errors: [] })
            set({ isLoading: true })
            const { data } = await AppealService.getAll(startDate, endDate)

            set({ appealList: data })

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ isLoading: false })
            set({ errors })
            return ErrorHandler(error)

        } finally {
            set({ isLoading: false })
        }

    },

    create: async (appeal: IAppeal) => {

        try {
            set({ errors: [] })
            const { data } = await AppealService.create(appeal)
            set((state) => ({ appealList: [...state.appealList, data] }))
            return data

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ errors })
            return ErrorHandler(error)
        }

    },
    update: async (appeal: IAppeal) => {

        try {
            set({ errors: [] })
            const { data } = await AppealService.update(appeal)

            set((state) => ({
                appealList: state.appealList.map(item =>
                    item.id === data.id ? data : item
                )
            }))

            return data

        } catch (error) {
            const errors = ErrorHandler(error)

            set({ errors })

            return ErrorHandler(error)
        }

    },
    cancelAllInWork: async () => {

        try {
            set({ errors: [] })
            const { data } = await AppealService.cancelAllInWork()
            set({ appealList: data })
            return data

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ errors })
            return ErrorHandler(error)
        }
    }
}))