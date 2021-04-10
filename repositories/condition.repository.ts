import {ConditionController} from "../controllers/condition.controller";
import {StatusInstance} from "../models/status.model";
import {ConditionInstance} from "../models/condition.model";
import {AreaInstance} from "../models/area.model";
import {SpeciesController} from "../controllers/species.controller";

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
                attributes: ['label']
            }],
            where: {
                id
            }
        });
    }

    public static async searchConditionByStatusAndArea(area: AreaInstance, status: StatusInstance, date: Date): Promise<ConditionInstance | null>
    {
        const conditionController = await ConditionController.getInstance();
        const conditions = await conditionController.condition.findAll({
            where: {
                date: date
            }
        });

        if(conditions === null)
        {
            return null;
        }

        for (const condition of conditions) {
            const json = JSON.parse(JSON.stringify(condition));
            if(json['area_id'] === area.id && json['status_id'] === status.id)
            {
                return condition;
            }
        }
        return null;
    }

    public static async updateCondition(id: number, date: Date): Promise<ConditionInstance | null>
    {
        const conditionController = await ConditionController.getInstance();
        const condition = await ConditionRepository.getCondition(id);

        if(condition === undefined || condition?.id === undefined) {
            return null;
        }

        date = await ConditionRepository.fixDateType(date);

        const props_convert = JSON.parse(JSON.stringify({date: date}));
        await conditionController.condition.update(
            props_convert,
            {
                where: {
                    id: condition.id
                }
            });

        return condition;
    }

    public static async fixDateType(date: Date): Promise<Date>
    {
        date.setUTCHours(0, 0, 0, 0);
        date.setDate((date.getDate() + 1));
        date.setMonth((date.getMonth() - 1));

        return date;
    }
}
