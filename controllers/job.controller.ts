import { ModelCtor } from "sequelize";
import { UserInstance } from "../models/user.model";
import {SequelizeManager} from "../models";
import { JobInstance, JobUpdateOption } from "../models/job.model";
import {JobRepository} from "../repositories/job.repository";

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

    public async getAllJobsWithUsers(offset: number | undefined, limit: number | undefined): Promise<JobInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await JobRepository.getAllJobsWithUsers(offset, limit);

        if(res.length > 0) {
            return res;
        }
        return [];
    }

    public async createJob(label_job: string): Promise<JobInstance | null> {

        return await this.job.create({
            label: label_job
        });
    }

    public async updateJob(id: number, props: JobUpdateOption): Promise<JobInstance |  null> {

        return JobRepository.updateJob(id, props);
    }

    public async deleteJob(id: number): Promise<void |  null> {

        return await JobRepository.deleteJob(id);
    }



}