import { ModelCtor } from "sequelize";
import { UserInstance } from "../models/user.model";
import {SequelizeManager} from "../models";
import { JobInstance, JobUpdateOption } from "../models/job.model";
import {JobRepository} from "../repositories/job.repository";
import { MaintainInstance } from "../models/maintain.model";

export class MaintainController {

    user: ModelCtor<UserInstance>;
    maintain: ModelCtor<MaintainInstance>;

    private static instance: MaintainController;

    public static async getInstance(): Promise<MaintainController> {
        if(MaintainController.instance === undefined) {
            const {user, maintain} = await SequelizeManager.getInstance();
            MaintainController.instance = new MaintainController(user, maintain);
        }
        return MaintainController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, maintain: ModelCtor<MaintainInstance>) {
        this.user = user;
        this.maintain = maintain;
    }

}