import { ConditionController } from "../controllers/condition.controller";
import { StatusInstance, StatusUpdateProps } from "../models/status.model";
import {ConditionInstance} from "../models/condition.model";
import {AreaInstance} from "../models/area.model";

export class ConditionRepository {

    public static async getAllConditions(offset: number, limit: number): Promise<ConditionInstance[]> {
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

    public static async getCondition(id: number): Promise<ConditionInstance | null> {
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

    public static async getAllStatus(offset: number, limit: number): Promise<StatusInstance[]> {
        const conditionController = await ConditionController.getInstance();
        return await conditionController.status.findAll({
            attributes: ['id', 'name'],
            offset,
            limit
        });
    }

    public static async getStatus(id: number): Promise<StatusInstance | null> {
        const conditionController = await ConditionController.getInstance();

        return await conditionController.status.findOne({
            where: {
                id
            }
        });
    }
}
