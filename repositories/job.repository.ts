import {JobController} from "../controllers/job.controller";
import {JobInstance, JobUpdateOption} from "../models/job.model";

export class JobRepository {

    public static async getJobById(id: number): Promise<JobInstance | null> {
        const jobController = await JobController.getInstance();
        return await jobController.job.findOne({
            where: {
                id
            }
        });
    }

    public static async getAllJobsWithUsers(offset: number, limit: number): Promise<JobInstance[]> {
        const jobController = await JobController.getInstance();
        return await jobController.job.findAll({
            attributes: ['label', 'id'],
            include: [{
                model: jobController.user,
                attributes: ['name', 'surname', 'email']
            }],
            offset, 
            limit
        });
    }

    public static async updateJob(id: number, props: JobUpdateOption): Promise<JobInstance | null> {
        const jobController = await JobController.getInstance();
        const props_convert = JSON.parse(JSON.stringify(props));
        await jobController.job.update(
            props_convert,
            {
                where: {
                    id
                }
            });

        return jobController.job.findOne({where: {id}});
    }

    public static async deleteJob(idJob: number): Promise<void | null> {
        const jobController = await JobController.getInstance();

        await jobController.job.destroy({
            where: {
                id: idJob
            },
        });
    }
}