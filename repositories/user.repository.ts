import { ModelCtor } from "sequelize/types";
import { UserController } from "../controllers/user.controller";
import { UserInstance, UserUpdateOptions } from "../models/user.model";

export class UserRepository {

    public static async getAllUsers(offset: number, limit: number) {

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

    public static async updateUser(token: string, props: UserUpdateOptions): Promise<UserInstance | null> {

        const userController = await UserController.getInstance();
        const user = await userController.getUser(token);
    
        const email_user = user?.email;
        console.log(email_user);
        
        console.log("je suis une pomme");
        const props_convert = JSON.parse(JSON.stringify(props));
        
        if(email_user === undefined) {
            return null;
        }
        const result =  await userController.user.update(
            props_convert,
            {
                where: {
                    email: email_user.toString().trim()
                }
            });

        const user_modified = await userController.getUser(token);
        
        return user_modified;
    }
}