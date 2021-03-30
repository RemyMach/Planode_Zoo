import { ModelCtor } from "sequelize";
import { UserInstance } from "../models/user.model";
import {SequelizeManager} from "../models";
import { JobInstance } from "../models/job.model";

export class JobController {

    user: ModelCtor<UserInstance>;
    job: ModelCtor<JobInstance>;

    private static instance: JobController;

    public static async getInstance(): Promise<JobController> {
        if(JobController.instance === undefined) {
            const {user, job, role, session} = await SequelizeManager.getInstance();
            JobController.instance = new JobController(user, job);
        }
        return JobController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, job: ModelCtor<JobInstance>) {
        this.user = user;
        this.job = job;
    }

    public async getAll(offset: number | undefined, limit: number | undefined): Promise<JobInstance[]> {

        limit = limit || 30;
        offset = offset || 0;
        
        const res = await this.job.findAll({
            attributes: ["label"],
            limit, 
            offset
        });
           
        if(res.length > 0) {
            
            return res;
        }

        return [];

    }

}