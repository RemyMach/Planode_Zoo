import { ConditionController } from "../controllers/condition.controller";
import { StatusInstance} from "../models/status.model";
import {ConditionInstance} from "../models/condition.model";

export class ConditionRepository
{
    public static async getAllConditions(offset: number, limit: number): Promise<ConditionInstance[]>
    {
        const conditionController = await ConditionController.getInstance();
        return await conditionController.condition.findAll({
            attributes: ['id', 'date'],
            include: [{
                model: conditionController.area,
                attributes: ['name']
            }],
            offset,
            limit
        });
    }

    public static async getCondition(id: number): Promise<ConditionInstance | null>
    {
        const conditionController = await ConditionController.getInstance();

        return await conditionController.condition.findOne({
            attributes: ['id', 'date'],
            include: [{
                model: conditionController.area,
                attributes: ['name']
            },
            {
                model: conditionController.status,
                attributes: ['name']
            }],
            where: {
                id
            }
        });
    }
}
