import { WeekController } from "../controllers/week.controller";
import {WeekCreateOption, WeekInstance}  from "../models/week.model";
import { PresenceController } from "../controllers/presence.controller";
import { PresenceInstance, PresenceUpdateOption } from "../models/presence.model";
import { UserInstance } from "../models/user.model";
import { Json } from "sequelize/types/lib/utils";
import { UserRepository } from "./user.repository";
import { WeekRepository } from "./week.repository";
import { UserController } from "../controllers/user.controller";
import {Op} from 'sequelize';


export class PresenceRepository {

    public static async getPresenceLineForADate(id_user: number, date: Date): Promise<UserInstance | null> {

        const presenceController = await PresenceController.getInstance();
        return presenceController.user.findOne({
            attributes: ['id', 'email'],
            where: {
                id: id_user
            },
            include: [{
                model: presenceController.week,
                attributes: ['start_date', 'end_date'],
                where: {
                    start_date: date
                },
                // ici on séléctionne les bons attributs de la table associative
                through: {
                    attributes: ['id','is_programmed', 'is_worked', 'is_available']
                }
            }],
        });
    }

    public static async getAvailableUsersForAPeriod(start_date_formated: Date, end_date_formated: Date, props: any): Promise<UserInstance[] | null> {
        
        const presenceController = await PresenceController.getInstance();
        const userController = await UserController.getInstance();

        if(props['is_available'] === undefined) {
            props['is_available'] = true;
        }

        return presenceController.user.findAll({
            attributes: ['id', 'email'],
            include: [{
                    model: userController.role,
                    attributes: ['label']
                },{
                    model: userController.job,
                    attributes: ['label']
                },
                {
                model: presenceController.week,
                required: false,
                attributes: ['start_date', 'end_date'],
                where: {
                    start_date: {
                        [Op.lte]: start_date_formated
                    },
                    end_date: {
                        [Op.gte]: end_date_formated
                    }
                },
                // ici on séléctionne les bons attributs de la table associative
                through: {
                    attributes: ['id','is_programmed', 'is_worked', 'is_available'],
                    where: props
                }
            }],
        });
    }

    public static async getProgrammedUsersForAPeriod(start_date_formated: Date, end_date_formated: Date, props: any): Promise<UserInstance[] | null> {

        const presenceController = await PresenceController.getInstance();
        const userController = await UserController.getInstance();
        if(props['is_available'] === undefined) {
            props['is_available'] = true;
        }

        return await presenceController.user.findAll({
            attributes: ['id', 'email'],
            include: [{
                    model: userController.role,
                    attributes: ['label']
                },{
                    model: userController.job,
                    attributes: ['label']
                },
                {
                model: presenceController.week,
                attributes: ['start_date', 'end_date'],
                where: {
                    start_date: {
                        [Op.lte]: start_date_formated
                    },
                    end_date: {
                        [Op.gte]: end_date_formated
                    }
                },
                // ici on séléctionne les bons attributs de la table associative
                through: {
                    attributes: ['id','is_programmed', 'is_worked', 'is_available'],
                    where: props
                }
            }],
        });

    }

    public static async getAvailableUsersForAPeriodWithASpecificWork(work: string, start_date_formated: Date, end_date_formated: Date): Promise<UserInstance[] | null> {
        
        const presenceController = await PresenceController.getInstance();
        const userController = await UserController.getInstance();
        return await presenceController.user.findAll({
            attributes: ['id', 'email'],
            include: [{
                    model: userController.role,
                    attributes: ['label']
                },{
                    model: userController.job,
                    attributes: ['label'],
                    where: {
                        label: work
                    }
                },
                {
                model: presenceController.week,
                required: false,
                attributes: ['start_date', 'end_date'],
                where: {
                    start_date: {
                        [Op.gte]: start_date_formated
                    },
                    end_date: {
                        [Op.lte]: end_date_formated
                    }
                },
                // ici on séléctionne les bons attributs de la table associative
                through: {
                    attributes: ['id','is_programmed', 'is_worked', 'is_available'],
                    where: {
                        is_available: true
                    }
                }
            }],
        });
    }

    public static async getPresenceFromWeekAndUser(id_user: number, date: Date): Promise<PresenceInstance | null> {
        const presenceController = await PresenceController.getInstance();
        const user = await this.getPresenceLineForADate(id_user, date);
        if(user === null) {
            return null;
        }

        const json = JSON.parse(JSON.stringify(user));
        const id_presence = json['Weeks'][0]['Presence']['id'];

        return await presenceController.presence.findByPk(id_presence, {attributes: ['is_programmed', 'is_worked', 'is_available']});
    }

    public static async getPresenceForAUser(id_user: number, props: any): Promise<UserInstance[]>  {
        const presenceController = await PresenceController.getInstance();

        if(props['is_available'] === undefined) {
            props['is_available'] = true;
        }

        return await presenceController.user.findAll({
            attributes: ['id', 'email'],
            where: {
                id: id_user
            },
            include: [{
                model: presenceController.week,
                attributes: ['start_date', 'end_date'],
                // ici on séléctionne les bons attributs de la table associative
                through: {
                    attributes: ['id','is_programmed', 'is_worked', 'is_available'],
                    where: props
                    
                }
            }],
        });

    }

    public static async updatePresenceLine(id_user: number, date: Date, props: any): Promise<PresenceInstance | null> {
        const presenceController = await PresenceController.getInstance();
        const user = await this.getPresenceLineForADate(id_user, date);
        if(user === null) {
            return null;
        }

        console.log(props);
        
        const json = JSON.parse(JSON.stringify(user));
        const id_presence = json['Weeks'][0]['Presence']['id'];
        let whereJSON: any = {}
        whereJSON.id = id_presence;

        if(props['is_available'] === undefined) {
            whereJSON.is_available = true;
        }

        console.log("where -> " + whereJSON);
        
        const res =  await presenceController.presence.update(
            props,
            {
                where: whereJSON,
                returning: false,
            },
        );

        return await presenceController.presence.findByPk(id_presence, {attributes: ['is_programmed', 'is_worked', 'is_available']});
    }

    public static async createPresenceLine(id_user: number, date: Date, props: any): Promise<PresenceInstance | null> {
        const presenceController = await PresenceController.getInstance();
        const user = await UserRepository.getUserById(id_user);
        const week = await WeekRepository.getWeekByTheStartDate(date);
        console.log(user);
        console.log(week);
        
        if(user === null || week === null) {
            return null;
        }
        props['is_available'] = true;

        await user.addWeek(week,{through: props});

        return await this.getPresenceFromWeekAndUser(id_user, date);
    }
}