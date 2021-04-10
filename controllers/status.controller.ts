import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {StatusInstance} from "../models/status.model";
import {StatusRepository} from "../repositories/status.repository";
import {AreaInstance} from "../models/area.model";
import {ConditionInstance} from "../models/condition.model";
import {ConditionRepository} from "../repositories/condition.repository";

export class StatusController
{
    status: ModelCtor<StatusInstance>;

    private static instance: StatusController;

    public static async getInstance(): Promise<StatusController> {
        if(StatusController.instance === undefined) {
            const { status } = await SequelizeManager.getInstance();
            StatusController.instance = new StatusController(status);
        }
        return StatusController.instance;
    }

    private constructor(status: ModelCtor<StatusInstance>) {
        this.status = status;
    }

    public async getAllStatus(offset: number | undefined, limit: number | undefined): Promise<StatusInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await StatusRepository.getAllStatus(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async createStatus(label: string): Promise<StatusInstance | null>
    {
        await this.status.create({
            label
        });

        return StatusRepository.searchStatusByLabel(label);
    }

    public async updateStatus(id: number, label: string): Promise<StatusInstance | null> {
        return await StatusRepository.updateStatus(id, label);
    }
}
