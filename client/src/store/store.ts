import { create } from 'zustand'
import ErrorHandler from '../exeptions/ErrorHandler'
import { IAppeal } from '../models/Appeal.ts'
import AppealService from '../services/appealService.ts'

interface IStore {
    appeal: IAppeal,
    appealList: IAppeal[],
    getAll: () => Promise<IAppeal[]>,
    create: (appeal: IAppeal) => Promise<IAppeal>,
    update: (appeal: IAppeal) => Promise<IAppeal>
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

    getAll: async () => {

        try {
            set({ errors: [] })
            set({ isLoading: true })
            const { data } = await AppealService.getAll()

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
            set({ isLoading: true })
            const { data } = await AppealService.create(appeal)
            set((state) => ({ appealList: [...state.appealList, data] }))
            return data

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ isLoading: false })
            set({ errors })
            return ErrorHandler(error)
        } finally {
            set({ isLoading: false })
        }

    },
    update: async (appeal: IAppeal) => {

        try {
            set({ errors: [] })
            set({ isLoading: true })

            const { data } = await AppealService.update(appeal)
            set((state) => ({ appealList: [...state.appealList, data] }))
            return data

        } catch (error) {
            const errors = ErrorHandler(error)
            set({ isLoading: false })
            set({ errors })
            return ErrorHandler(error)
        } finally {
            set({ isLoading: false })
        }

    }


}))