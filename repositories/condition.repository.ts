import {ConditionController} from "../controllers/condition.controller";
import {StatusInstance} from "../models/status.model";
import {ConditionInstance} from "../models/condition.model";
import {AreaInstance} from "../models/area.model";
import {StatusController} from "../controllers/status.controller";

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
            },{
                model: conditionController.status,
                attributes: ['label']
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

        return await ConditionRepository.getCondition(id);
    }

    public static async deleteCondition(id: number): Promise<boolean> {
        const conditionController = await ConditionController.getInstance();
        await conditionController.condition.destroy({
            where: {
                id: id
            }
        });

        const condition = await ConditionRepository.getCondition(id);
        return condition === null;
    }

    public static async fixDateType(date: Date): Promise<Date>
    {
        date.setUTCHours(0, 0, 0, 0);
        date.setDate((date.getDate() + 1));
        date.setMonth((date.getMonth() - 1));

        return date;
    }

    static async getActualAreaStatus(area_id: number): Promise<StatusInstance | null>
    {
        const conditionController = await ConditionController.getInstance();
        const statusController = await StatusController.getInstance();

        const conditions = await conditionController.condition.findAll({
            attributes: ['id'],
            include: [{
                model: conditionController.area,
                required: true,
                where: {
                    id: area_id,
                }
            },{
                model: conditionController.status
            }]
        });
        const json = JSON.parse(JSON.stringify(conditions));
        const status_id = json[json.length-1].Status.id;

        return await statusController.status.findOne({
            where: {
                id: status_id
            }
        });
    }
}
