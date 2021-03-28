import { ModelCtor } from "sequelize";
import { UserInstance } from "../models/user.model";
import {SequelizeManager} from "../models";
import {RoleInstance} from "../models/role.model";
import { JobInstance } from "../models/job.model";
import {Secret, verify} from 'jsonwebtoken';
import { SessionInstance } from "../models/session.model";

export class UserController {

    user: ModelCtor<UserInstance>;
    job: ModelCtor<JobInstance>;
    role: ModelCtor<RoleInstance>;
    session: ModelCtor<SessionInstance>;

    private static instance: UserController;

    public static async getInstance(): Promise<UserController> {
        if(UserController.instance === undefined) {
            const {user, job, role, session} = await SequelizeManager.getInstance();
            UserController.instance = new UserController(user, job, role, session);
        }
        return UserController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, job: ModelCtor<JobInstance>, role: ModelCtor<RoleInstance>, session: ModelCtor<SessionInstance>) {
        this.user = user;
        this.job = job;
        this.role = role;
        this.session = session;
    }

    public async getAll(offset: number | undefined, limit: number | undefined): Promise<UserInstance[]> {

        limit = limit || 30,
        offset = offset || 0;
        
        const res = await this.user.findAll({
            attributes: ['name', 'surname', 'email'],
            include: [{
                model: this.role,
                attributes: ['label']
            },{
                model: this.job,
                attributes: ['label']
            }],
            offset, 
            limit
        });

        if(res.length > 0) {
            
            return res;
        }

        return [];
    }

    public async getUser(token: string): Promise<UserInstance | null> {

        const decoded = verify(token, process.env.JWT_SECRET as Secret);

        const user = await this.user.findOne({
            attributes: ['name', 'surname', 'email'],
            include: [{
                model: this.role,
                attributes: ['label']
            },{
                model: this.job,
                attributes: ['label']
            },
            {
                model: this.session,
                attributes: [],
                where: {
                    token
                }
            }],
        });
        
        if(user !== null) {
            
            return user;
        }

        return null;
    }
}