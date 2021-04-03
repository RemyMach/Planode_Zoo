import { ModelCtor } from "sequelize";
import { UserInstance, UserUpdateOptions, UserUpdatePasswordOptions } from "../models/user.model";
import {SequelizeManager} from "../models";
import { WeekInstance, WeekProps, WeekCreateOption } from "../models/week.model";
import { PresenceInstance, PresenceUpdateOption } from "../models/presence.model";
import { UserRepository } from "../repositories/user.repository";
import { WeekReository } from "../repositories/week.repository";
import { PresenceRepository } from "../repositories/presence.repository";


export class PresenceController {
    user: ModelCtor<UserInstance>;
    week: ModelCtor<WeekInstance>;
    presence: ModelCtor<PresenceInstance>;

    private static instance: PresenceController;

    public static async getInstance(): Promise<PresenceController> {
        if(PresenceController.instance === undefined) {
            const {user, week, presence} = await SequelizeManager.getInstance();
            PresenceController.instance = new PresenceController(user, week, presence);
        }
        return PresenceController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, week: ModelCtor<WeekInstance>, presence: ModelCtor<PresenceInstance>) {
        this.user = user;
        this.week = week;
        this.presence = presence;
    }

    public async updatePrevision(id_user: number, date: string, props: PresenceUpdateOption): Promise<PresenceInstance |  null> {
        const user__to_modify = UserRepository.getUserById(id_user);

        if(user__to_modify === null) {
            return null;
        }

        const date_formated = this.convertStringDateInDateFormat(date);
        if(date_formated === null) {
            return null;
        }

        console.log(date_formated);
        
        const presence_line = await PresenceRepository.getPresenceLineForADate(id_user, date_formated);
        

        if(presence_line === null) {
            
            return null;
        }
        
        return await PresenceRepository.updatePresenceLine(id_user, date_formated, props);
        
    }

    private getFormatedUpdateOption(props: PresenceUpdateOption): JSON {

        if(props.is_available === undefined)
            delete props.is_available;
        if(props.is_worked === undefined)
            delete props.is_worked;
        if(props.is_programmed === undefined)
            delete props.is_programmed;

        return JSON.parse(JSON.stringify(props));
    }

    private convertStringDateInDateFormat(date: string): Date | null {
        try{
            const new_date = new Date(date);
            new_date.setUTCHours(0, 0, 0, 0);
            new_date.setDate((new_date.getDate() + 1))
            return new_date;
        }catch {
            return null;
        }
    }


}