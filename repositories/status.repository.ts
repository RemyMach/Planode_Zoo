import {StatusInstance} from "../models/status.model";
import {StatusController} from "../controllers/status.controller";
import {ConditionInstance} from "../models/condition.model";
import {ConditionController} from "../controllers/condition.controller";

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

    public static async searchStatusByLabel(label: string): Promise<StatusInstance | null>
    {
        const statusController = await StatusController.getInstance();
        return await statusController.status.findOne({
            where: {
                label
            }
        });
    }

    public static async updateStatus(id: number, label: string): Promise<StatusInstance | null> {

        const statusController = await StatusController.getInstance();
        const status = await StatusRepository.getStatus(id);

        if(status === undefined || status?.id === undefined) {
            return null;
        }

        const props_convert = JSON.parse(JSON.stringify({label: label}));
        await statusController.status.update(
            props_convert,
            {
                where: {
                    id: status.id
                }
            });

        return await StatusRepository.getStatus(id);
    }
}
