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

    public static async updateUser(token: string, props: UserUpdateOptions): Promise<UserInstance[] | null> {

        const userController = await UserController.getInstance();
        const user = userController.getUser(token);
        // à faire
        const email_user = user.then(e => e?.email);
        console.log(email_user);
        console.log("je suis une pomme");
        
        
        if(email_user === undefined) {
            return null;
        }
        const result =  await userController.user.update(
            {
                name: "pomme"
            },
            {
                where: {
                    email: email_user.toString().trim()
                }
            });
        console.log(result);
        
        return null;
    }
}