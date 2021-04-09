import { ModelCtor } from "sequelize";
import { UserInstance } from "../models/user.model";
import {SequelizeManager} from "../models";
import { JobInstance, JobUpdateOption } from "../models/job.model";
import {JobRepository} from "../repositories/job.repository";
import { MaintainCreationOptionProps, MaintainInstance } from "../models/maintain.model";
import { AreaInstance } from "../models/area.model";
import { MaintainRepository } from "../repositories/maintain.repository";

export class MaintainController {

    user: ModelCtor<UserInstance>;
    maintain: ModelCtor<MaintainInstance>;
    area: ModelCtor<AreaInstance>;

    private static instance: MaintainController;

    public static async getInstance(): Promise<MaintainController> {
        if(MaintainController.instance === undefined) {
            const {user, maintain, area} = await SequelizeManager.getInstance();
            MaintainController.instance = new MaintainController(user, maintain, area);
        }
        return MaintainController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, maintain: ModelCtor<MaintainInstance>, area: ModelCtor<AreaInstance>) {
        this.user = user;
        this.maintain = maintain;
        this.area = area;
    }

    public async createAMaintain(props: MaintainCreationOptionProps): Promise<MaintainInstance | null> {

        const start_date_formated = this.convertStringDateInDateFormat(props.start_date);
        const end_date_formated = this.convertStringDateInDateFormat(props.end_date);
        if(start_date_formated === null || end_date_formated === null) {
            return null;
        }

        return await MaintainRepository.createMaintain(
            start_date_formated,
            end_date_formated,
            props.user_id,
            props.area_id
        );
    }

    private convertStringDateInDateFormat(date: string): Date | null {
        try{
            const new_date = new Date(date);
            new_date.setUTCHours(0, 0, 0, 0);
            new_date.setDate((new_date.getDate() + 1))
            return new_date;
        }catch {
            return null;
        }
    }

}