import { IAppealDto } from '../types/appeal.js'
import prismaClient from '../../prisma/prisma.client.js'
import { Appeal } from '@prisma/client'



class AppealService {

  async create({ title, description }: Omit<IAppealDto, 'id' | 'status'>): Promise<Appeal> {
    return await prismaClient.appeal.create({
      data: { title, description }
    })
  }

  async update(id: string, appeal: IAppealDto): Promise<Appeal> {
    return await prismaClient.appeal.update({
      where: { id },
      data: { title: appeal.title, description: appeal.description, status: appeal.status }

    })
  }

  // async updateStatus(id: string, { status }: IAppealDto): Promise<Appeal> {
  //   return await prismaClient.appeal.update({
  //     where: { id },
  //     data: { status }

  //   })
  // }

  async getAll(): Promise<Appeal[]> {
    return await prismaClient.appeal.findMany({
      orderBy: [{ updatedAt: 'desc' }]
    })
  }
}

export default new AppealService()
