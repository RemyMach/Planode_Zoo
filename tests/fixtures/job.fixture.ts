import { SequelizeManager } from "../../models";
import {JobInstance} from "../../models/job.model";
import { fixture } from "./fixture";

export class JobFixture implements fixture{

    job_receptionist?: JobInstance;
    job_veterinary?: JobInstance;
    job_seller?: JobInstance;
    job_service_agent?: JobInstance;
    job_developer?: JobInstance;

    private static instance: JobFixture;

    public static async getInstance(): Promise<JobFixture> {
        if(JobFixture.instance === undefined) {
            JobFixture.instance = new JobFixture();
        }
        return JobFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        
        this.job_receptionist = await manager.job.create({
            label: "receptionist"
        });
        this.job_veterinary = await manager.job.create({
            label: "veterinary"
        });
        this.job_seller = await manager.job.create({
            label: "seller"
        });
        this.job_service_agent = await manager.job.create({
            label: "service_agent"
        });
        this.job_developer = await manager.job.create({
            label: "developer"
        });
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.user.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.job.destroy({
            truncate: true,
            force: true
        });
    }
}