import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {StatusInstance} from "../models/status.model";
import {StatusRepository} from "../repositories/status.repository";

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
}
