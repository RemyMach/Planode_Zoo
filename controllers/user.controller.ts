import {ModelCtor} from "sequelize";
import {UserInstance, UserUpdateOptions, UserUpdatePasswordOptions} from "../models/user.model";
import {SequelizeManager} from "../models";
import {RoleInstance} from "../models/role.model";
import {JobInstance} from "../models/job.model";
import {Secret, verify} from 'jsonwebtoken';
import {SessionInstance} from "../models/session.model";
import {UserRepository} from "../repositories/user.repository";
import {compare} from "bcrypt";

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

        limit = limit || 30;
        offset = offset || 0;
        
        const res = await UserRepository.getAllUsers(offset, limit);

        if(res.length > 0) {
            return res;
        }


        return [];
    }

    public async getUser(token: string): Promise<UserInstance | null> {

        const decoded = verify(token, process.env.JWT_SECRET as Secret);

        const user = await UserRepository.getUser(token);
        
        if(user !== null) {
            
            return user;
        }

        return null;
    }

    public async updateUser(token: string, props: UserUpdateOptions): Promise<UserInstance | null> {

        if(props.email === undefined)
            delete props.email;
        if(props.name === undefined)
            delete props.name;
        if(props.surname === undefined)
            delete props.surname;
        const user = await UserRepository.updateUser(token, props);
        
        return user;
    }

    public async updatePassword(token: string, props: UserUpdatePasswordOptions): Promise<UserInstance | null> {

        const user = await UserRepository.getUserEncryptedPassword(token);
        if(user === null) {
            return null;
        }

        if(props.new_password !== props.new_password_confirm) {
            throw new Error('Error new_password and new_password_confirm are not they same')
        }
        
        const isSamePassword = await compare(props.password, user.password);
        if(!isSamePassword) {
            throw new Error("The password is invalid");
        }

        return await UserRepository.updateUserpassword(token, props.new_password);
    }

    public async deleteUser(token: string, password: string): Promise<void | null> {

        const user = await UserRepository.getUserEncryptedPassword(token);
        if(user === null) {
            return null;
        }
        
        const isSamePassword = await compare(password, user.password);
        if(!isSamePassword) {
            throw new Error("The password is invalid");
        }

        return await UserRepository.deleteUser(token);
    }
}