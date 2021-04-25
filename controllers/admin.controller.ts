import {ModelCtor} from "sequelize";
import {UserCreateProps, UserInstance, UserUpdateOptions, UserUpdatePasswordOptions} from "../models/user.model";
import {SequelizeManager} from "../models";
import {RoleInstance} from "../models/role.model";
import {JobInstance} from "../models/job.model";
import {Secret, verify} from 'jsonwebtoken';
import {SessionInstance} from "../models/session.model";
import {UserRepository} from "../repositories/user.repository";
import {compare} from "bcrypt";
import { AdminCreateUserOption, AdminUpdateUserOption } from "../models/admin.model";

export class AdminController {

    user: ModelCtor<UserInstance>;
    job: ModelCtor<JobInstance>;
    role: ModelCtor<RoleInstance>;
    session: ModelCtor<SessionInstance>;

    private static instance: AdminController;

    public static async getInstance(): Promise<AdminController> {
        if(AdminController.instance === undefined) {
            const {user, job, role, session} = await SequelizeManager.getInstance();
            AdminController.instance = new AdminController(user, job, role, session);
        }
        return AdminController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, job: ModelCtor<JobInstance>, role: ModelCtor<RoleInstance>, session: ModelCtor<SessionInstance>) {
        this.user = user;
        this.job = job;
        this.role = role;
        this.session = session;
    }

    public async updateUserJobRole(props: AdminUpdateUserOption): Promise<UserInstance | null> {

        if(props.job_id === 5 || props.role_id === 3)
            return null
        
        return await UserRepository.adminUpdateJobRole(props);
    }

    public async createUser(propsUser: UserCreateProps,propsAdmin: AdminCreateUserOption): Promise<UserInstance | null> {

        if(propsAdmin.job_id === 5 || propsAdmin.role_id === 3)
            return null
        
        return await UserRepository.adminCreateUser(propsUser, propsAdmin);
    }

}