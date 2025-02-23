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
      data: {...appeal}

    })
  }

  async getAll(startDate?: string, endDate?: string): Promise<Appeal[]> {
    const whereClause: { updatedAt?: { gte?: Date; lte?: Date } } = {};

    if (startDate) {
      whereClause.updatedAt = {
        gte: new Date(startDate)
      };
    }

    if (endDate) {
      const endDateObj = new Date(endDate)
      endDateObj.setHours(23, 59, 59, 999); // Устанавливаем время на конец дня
      whereClause.updatedAt = {
        ...whereClause.updatedAt,
        lte: endDateObj
      };
    }
    return await prismaClient.appeal.findMany({
      where: whereClause,
      orderBy: [{ updatedAt: 'desc' }]
    })
  }

  async cancelAllInWork(): Promise<Appeal[]> {

    return await prismaClient.appeal.updateManyAndReturn({
      where: {
        status: 'inWork'
      },
      data: {
        status: 'canceled'
      }
    })
  }


}

export default new AppealService()
