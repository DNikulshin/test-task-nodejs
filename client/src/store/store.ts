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
    isLoadingGetAll: boolean
    isLoadingUpdate: boolean
    isLoadingCreate: boolean
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
    isLoadingGetAll: false,
    isLoadingUpdate: false,
    isLoadingCreate: false,
    errors: [],
    appealList: [],

    getAll: async (startDate, endDate) => {

        try {
            set({ errors: [] })
            set({ isLoadingGetAll: true })
            const { data } = await AppealService.getAll(startDate, endDate)

            set({ appealList: data })

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ isLoadingGetAll: false })
            set({ errors })
            return ErrorHandler(error)

        } finally {
            set({ isLoadingGetAll: false })
        }

    },

    create: async (appeal: IAppeal) => {

        try {
            set({ errors: [] })
            set({ isLoadingCreate: true })
            const { data } = await AppealService.create(appeal)
            set((state) => ({ appealList: [...state.appealList, data] }))
            return data

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ isLoadingCreate: false })
            set({ errors })
            return ErrorHandler(error)
        } finally {
            set({ isLoadingCreate: false })
        }

    },
    update: async (appeal: IAppeal) => {

        try {
            set({ errors: [] })
            set({ isLoadingUpdate: true })

            const { data } = await AppealService.update(appeal)
            set((state) => ({ appealList: [...state.appealList, data] }))
            return data

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ isLoadingUpdate: false })
            set({ errors })
            return ErrorHandler(error)
        } finally {
            set({ isLoadingUpdate: false })
        }

    },
    cancelAllInWork: async () => {

        try {
            set({ errors: [] })
            set({ isLoadingUpdate: true })

            const { data } = await AppealService.cancelAllInWork()
            set({ appealList: data })
            return data

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ isLoadingUpdate: false })
            set({ errors })
            return ErrorHandler(error)
        } finally {
            set({ isLoadingUpdate: false })
        }

    }

}))