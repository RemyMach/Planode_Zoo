import { SequelizeManager } from "../../models";
import {JobInstance} from "../../models/job.model";

export class JobFixture {

    job_receptionist?: JobInstance;
    job_veterinary?: JobInstance;
    job_seller?: JobInstance;
    job_service_agent?: JobInstance;

    private static instance: JobFixture;

    public static async getInstance(): Promise<JobFixture> {
        if(JobFixture.instance === undefined) {
            JobFixture.instance = new JobFixture();
        }
        return JobFixture.instance;
    }

    private constructor() {};

    public async setUpJobTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        this.job_receptionist = await  manager.job.create({
            label: "receptionist"
        });
        this.job_veterinary = await  manager.job.create({
            label: "veterinary"
        });
        this.job_seller = await  manager.job.create({
            label: "seller"
        });
        this.job_service_agent = await  manager.job.create({
            label: "service_agent"
        });
    }
}