import prismaClient from '../../prisma/prisma.client.js';
class AppealService {
    async create({ title, description }) {
        return await prismaClient.appeal.create({
            data: { title, description }
        });
    }
    async update(id, appeal) {
        return await prismaClient.appeal.update({
            where: { id },
            data: { ...appeal }
        });
    }
    async getAll(startDate, endDate) {
        const whereClause = {};
        if (startDate) {
            whereClause.updatedAt = {
                gte: new Date(startDate)
            };
        }
        if (endDate) {
            const endDateObj = new Date(endDate);
            endDateObj.setHours(23, 59, 59, 999);
            whereClause.updatedAt = {
                ...whereClause.updatedAt,
                lte: endDateObj
            };
        }
        return await prismaClient.appeal.findMany({
            where: whereClause,
            orderBy: [{ updatedAt: 'desc' }]
        });
    }
    async cancelAllInWork() {
        return await prismaClient.appeal.updateManyAndReturn({
            where: {
                status: 'inWork'
            },
            data: {
                status: 'canceled'
            }
        });
    }
}
export default new AppealService();
//# sourceMappingURL=appeal.service.js.map