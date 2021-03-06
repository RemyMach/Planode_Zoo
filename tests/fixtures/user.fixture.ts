import {SequelizeManager} from "../../models";
import {JobFixture} from './job.fixture';
import {fixture} from "./fixture";
import {UserInstance} from "../../models/user.model";
import {RoleFixture} from "./role.fixture";

export class UserFixture implements fixture{

    user_admin_receptionist?: UserInstance;
    user_normal_service_agent?: UserInstance;
    user_super_admin?: UserInstance;
    user_normal_healer?: UserInstance;
    user_normal_veterinarian?: UserInstance;
    user_admin_seller?: UserInstance;

    private static instance: UserFixture;

    public static async getInstance(): Promise<UserFixture> {
        if(UserFixture.instance === undefined) {
            UserFixture.instance = new UserFixture();
        }
        return UserFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const jobFixture = await JobFixture.getInstance();
        const roleFixture = await RoleFixture.getInstance();
        
        this.user_admin_receptionist = await manager.user.create({
            name: "eric",
            surname: "delacroix",
            email: "eric@gmail.com",
            password: "azertyuiop"
        });
        await this.user_admin_receptionist.setJob(jobFixture.job_receptionist);
        await this.user_admin_receptionist.setRole(roleFixture.role_admin);

        this.user_normal_service_agent = await manager.user.create({
            name: "Jean",
            surname: "tom",
            email: "tom@gmail.com",
            password: "azertyuiop"
        });
        await this.user_normal_service_agent.setJob(jobFixture.job_service_agent);
        await this.user_normal_service_agent.setRole(roleFixture.role_user);

        this.user_normal_healer = await manager.user.create({
            name: "gentil",
            surname: "Pam",
            email: "pam.gentil@gmail.com",
            password: "azertyuiop"
        });
        await this.user_normal_healer.setJob(jobFixture.job_healer);
        await this.user_normal_healer.setRole(roleFixture.role_admin);

        this.user_normal_veterinarian = await manager.user.create({
            name: "margaux",
            surname: "prodic",
            email: "margaux.prodic@gmail.com",
            password: "azertyuiop"
        });
        await this.user_normal_veterinarian.setJob(jobFixture.job_veterinary);
        await this.user_normal_veterinarian.setRole(roleFixture.role_admin);

        this.user_super_admin = await manager.user.create({
            name: "Rachel",
            surname: "Friend",
            email: "rachel@notime.com",
            password: "azertyuiop"
        });
        await this.user_super_admin.setJob(jobFixture.job_developer);
        await this.user_super_admin.setRole(roleFixture.role_super_admin);

        this.user_admin_seller = await manager.user.create({
            name: "Leonard",
            surname: "Dicapr",
            email: "leonardo.discpar@gmail.com",
            password: "azertyuiop"
        });
        await this.user_admin_seller.setJob(jobFixture.job_seller);
        await this.user_admin_seller.setRole(roleFixture.role_admin);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.user.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.user.destroy({
            truncate: true,
            force: true
        });
    }
}