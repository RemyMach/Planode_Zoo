import { ModelCtor } from "sequelize";
import { UserInstance, UserUpdateOptions, UserUpdatePasswordOptions } from "../models/user.model";
import {SequelizeManager} from "../models";
import { WeekInstance } from "../models/week.model";
import { PresenceInstance } from "../models/presence.model";
import { UserRepository } from "../repositories/user.repository";

export class WeekController {

    user: ModelCtor<UserInstance>;
    week: ModelCtor<WeekInstance>;
    presence: ModelCtor<PresenceInstance>;

    private static instance: WeekController;

    public static async getInstance(): Promise<WeekController> {
        if(WeekController.instance === undefined) {
            const {user, week, presence} = await SequelizeManager.getInstance();
            WeekController.instance = new WeekController(user, week, presence);
        }
        return WeekController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, week: ModelCtor<WeekInstance>, presence: ModelCtor<PresenceInstance>) {
        this.user = user;
        this.week = week;
        this.presence = presence;
    }

    public async addAYearSinceTheLastWeekinTheDB(): Promise<WeekInstance | null> {

        const date = new Date();
        date.getDate();
        date.getFullYear();
        date.getMonth();
        console.log(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
        
        console.log(date);
        return null;
        /*return await this.week.create({
            
        });*/
    }
}