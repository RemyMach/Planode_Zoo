import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {StatusInstance} from "../models/status.model";
import {ConditionRepository} from "../repositories/condition.repository";
import {ConditionInstance, ConditionPropsCreate} from "../models/condition.model";
import {AreaInstance} from "../models/area.model";

export class ConditionController {

    area: ModelCtor<AreaInstance>
    condition: ModelCtor<ConditionInstance>;
    status: ModelCtor<StatusInstance>;

    private static instance: ConditionController;

    public static async getInstance(): Promise<ConditionController> {
        if(ConditionController.instance === undefined) {
            const { area, condition, status } = await SequelizeManager.getInstance();
            ConditionController.instance = new ConditionController(area, condition, status);
        }
        return ConditionController.instance;
    }

    private constructor(area: ModelCtor<AreaInstance>, condition: ModelCtor<ConditionInstance>, status: ModelCtor<StatusInstance>) {
        this.area = area;
        this.condition = condition;
        this.status = status;
    }

    public async getAllConditions(offset: number | undefined, limit: number | undefined): Promise<ConditionInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await ConditionRepository.getAllConditions(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async addStatusToArea(area: AreaInstance, status: StatusInstance, date: Date): Promise<ConditionInstance | null>
    {
        date.setUTCHours(0, 0, 0, 0);
        date.setDate((date.getDate() + 1));
        date.setMonth((date.getMonth() - 1));

        const condition = await this.condition.create({date: date});
        condition.setArea(area);
        condition.setStatus(status);
        
        return condition;
    }

    public async updateCondition(id: number, date: Date): Promise<ConditionInstance | null>
    {
        return await ConditionRepository.updateCondition(id, date);
    }
}
