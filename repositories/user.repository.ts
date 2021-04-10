import { UserController } from "../controllers/user.controller";
import { UserInstance, UserUpdateOptions } from "../models/user.model";
import {Op} from 'sequelize';


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
            attributes: ['name', 'surname', 'email'],
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
}