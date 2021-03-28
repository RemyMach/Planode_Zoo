import { SequelizeManager } from "../../models";
import {sign, Secret} from 'jsonwebtoken';
import {JobFixture} from './job.fixture';
import { fixture } from "./fixture";
import {UserInstance} from "../../models/user.model";

export class UserFixture implements fixture{

    user_admin?: UserInstance;
    user_normal?: UserInstance;
    user_super_admin?: UserInstance;

    private static instance: UserFixture;

    public static async getInstance(): Promise<UserFixture> {
        if(UserFixture.instance === undefined) {
            UserFixture.instance = new UserFixture();
        }
        return UserFixture.instance;
    }

    private constructor() {};

    public async setUpTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const jobFixture = await JobFixture.getInstance();

        this.user_admin = await manager.user.create({
            name: "eric",
            surname: "delacroix",
            email: "eric@gmail.com",
            password: "azertyuiop"
        });
        await this.user_admin.setJob(jobFixture.job_receptionist);

        this.user_normal = await manager.user.create({
            name: "Jean",
            surname: "tom",
            email: "tom@gmail.com",
            password: "azertyuiop"
        });
        await this.user_normal.setJob(jobFixture.job_service_agent);

        this.user_super_admin = await manager.user.create({
            name: "Rachel",
            surname: "Friend",
            email: "rachel@notime.com",
            password: "azertyuiop"
        });
        await this.user_super_admin.setJob(jobFixture.job_developer);
    }
}