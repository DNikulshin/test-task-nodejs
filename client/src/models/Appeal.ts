import { AppealStatus } from '@prisma/client'

export interface IAppeal {
    id?: string
    title: string
    description: string
    status?: AppealStatus | string
    createdAt?: string
    updatedAt?: string
}