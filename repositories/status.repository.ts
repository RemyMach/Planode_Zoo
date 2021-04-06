import { StatusInstance } from "../models/status.model";
import { StatusController } from "../controllers/status.controller";

export class StatusRepository
{
    public static async getAllStatus(offset: number, limit: number): Promise<StatusInstance[]>
    {
        const statusController = await StatusController.getInstance();
        return await statusController.status.findAll({
            attributes: ['id', 'label'],
            offset,
            limit
        });
    }

    public static async getStatus(id: number): Promise<StatusInstance | null>
    {
        const statusController = await StatusController.getInstance();
        return await statusController.status.findOne({
            where: {
                id
            }
        });
    }
}
