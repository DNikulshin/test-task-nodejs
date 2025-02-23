
import { AppealStatus } from "@prisma/client"

export interface IAppealDto {
  id: string
  title: string
  description: string
  status: AppealStatus
  commemt?: string
  createdAt?: string
  updatedAt?: string
}
