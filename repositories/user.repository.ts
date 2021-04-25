import { UserController } from "../controllers/user.controller";
import { UserCreateProps, UserInstance, UserUpdateOptions } from "../models/user.model";
import {Op} from 'sequelize';
import { AdminCreateUserOption, AdminUpdateUserOption } from "../models/admin.model";
import { AdminController } from "../controllers/admin.controller";
import { RoleInstance } from "../models/role.model";
import { JobInstance } from "../models/job.model";

export class UserRepository {

    public static async getAllUsers(offset: number, limit: number): Promise<UserInstance[]> {

        const userController = await UserController.getInstance();
        return await userController.user.findAll({
            attributes: ['name', 'surname', 'email'],
            include: [{
                model: userController.role,
                attributes: ['label']
            },{
                model: userController.job,
                attributes: ['label']
            }],
            offset, 
            limit
        });
        
    } 

    public static async getUser(token: string): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        return  await userController.user.findOne({
            attributes: ['id', 'name', 'surname', 'email'],
            include: [{
                model: userController.role,
                attributes: ['label']
            },{
                model: userController.job,
                attributes: ['label']
            },
            {
                model: userController.session,
                attributes: [],
                where: {
                    token
                }
            }],
        });
    }

    public static async getUserByIdAndVerifyJob(id: number, job_labels: string[]): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        
        return  await userController.user.findOne({
            attributes: ['id','name', 'surname', 'email'],
            where: {
                id
            },
            include: [{
                model: userController.job,
                attributes: ['label'],
                where: {
                    [Op.or]: {label: job_labels}
                }
            }]
        });
    }

    public static async getUserById(id: number): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        return  await userController.user.findOne({
            attributes: ['id','name', 'surname', 'email'],
            where: {
                id
            }
        });
    }

    public static async getCompleteUserById(id: number): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        return  await userController.user.findOne({
            attributes: ['id','name', 'surname', 'email'],
            where: {
                id
            },
            include: [{
                model: userController.role,
                attributes: ['label']
            },{
                model: userController.job,
                attributes: ['label']
            }]
        });
    }

    public static async getUserByIdAndVerifyRole(id: number, role_labels: string[]): Promise<UserInstance | null> {
        
        const userController = await UserController.getInstance();
        
        return  await userController.user.findOne({
            attributes: ['id','name', 'surname', 'email'],
            where: {
                id
            },
            include: [{
                model: userController.role,
                attributes: ['label'],
                where: {
                    [Op.or]: {label: role_labels}
                }
            }]
        });
    }

    public static async getUserEncryptedPassword(token: string): Promise<UserInstance | null> {

        const userController = await UserController.getInstance();
        return await userController.user.findOne({
            attributes: ['password'],
            include: [{
                model: userController.session,
                attributes: [],
                where: {
                    token
                }
            }],
        });
    }

    public static async updateUser(token: string, props: UserUpdateOptions): Promise<UserInstance | null> {

        const userController = await UserController.getInstance();
        const user = await userController.getUser(token);
    
        const email_user = user?.email;
       
        const props_convert = JSON.parse(JSON.stringify(props));
        
        if(email_user === undefined) {
            return null;
        }
        await userController.user.update(
            props_convert,
            {
                where: {
                    email: email_user
                }
            });

        const user_modified = await userController.getUser(token);
        
        return user_modified;
    }

    public static async updateUserpassword(token: string, new_password: string | undefined): Promise<UserInstance | null> {

        const userController = await UserController.getInstance();
        const user = await userController.getUser(token);
    
        const email_user = user?.email;
        
        if(email_user === undefined || new_password === undefined) {
            return null;
        }

        await userController.user.update(
            {
                password: new_password
            },
            {
                where: {
                    email: email_user.toString().trim()
                },
                individualHooks: true
            });

        const user_modified = await userController.getUser(token);
        
        return user_modified;
    }

    public static async deleteUser(token: string): Promise<void | null> {
        const userController = await UserController.getInstance();
        const user = await userController.getUser(token);

        const email_user = user?.email;
        
        if(email_user === undefined){
            return null;
        }

        await userController.user.destroy({
            where: {
                email: email_user
            },
            individualHooks: true
        });
    }

    public static async adminUpdateJobRole(props: AdminUpdateUserOption): Promise<UserInstance | null> {

        const adminController = await AdminController.getInstance();
        const user = await this.getUserByIdAndVerifyRole(props.id, ['user', 'admin']);
        if(!user || (props.job_id === undefined && props.role_id === undefined) )
            return null;
        
        await adminController.user.update(
            props,
            {
                where: {
                    id: user.id
                },
                individualHooks: true
            });

        const user_modified = await this.getCompleteUserById(user.id);
        
        return user_modified;
    }

    public static async adminCreateUser(propsUser: UserCreateProps, propsAdmin: AdminCreateUserOption): Promise<UserInstance | null> {
        const adminController = await AdminController.getInstance();

        let user_role: RoleInstance | null = null;
        let user_job: JobInstance | null = null;
        if(propsAdmin.role_id) {
            user_role = await adminController.role.findByPk(propsAdmin.role_id);
            if(!user_role) {
                return null;
            }
        }
        if(propsAdmin.job_id) {
            user_job = await adminController.job.findByPk(propsAdmin.job_id);
            if(!user_job) {
                return null;
            }
        }
        
        const user = await adminController.user.create(propsUser);
        if(!user)
            return null;

        if(user_job !== null)
            await user.setJob(user_job);
        if(user_role !== null)
            await user.setRole(user_role);

        return await this.getCompleteUserById(user.id);
    }
}