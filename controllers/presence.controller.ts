import { ModelCtor } from "sequelize";
import { UserInstance, UserUpdateOptions, UserUpdatePasswordOptions } from "../models/user.model";
import {SequelizeManager} from "../models";
import { WeekInstance, WeekProps, WeekCreateOption } from "../models/week.model";
import { PresenceInstance, PresenceUpdateOption, PresenceGetOption } from "../models/presence.model";
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

    public async getPresenceForAUser(id_user: number, props: PresenceGetOption): Promise<UserInstance[] | null> {
        const user__to_modify = UserRepository.getUserById(id_user);

        if(user__to_modify === null) {
            return null;
        }

        return await PresenceRepository.getPresenceForAUser(id_user, this.getFormatedGetOption(props));
    }

    public async getAvailableUsersForAPeriod(start_date: string, end_date: string) {

        const start_date_formated = this.convertStringDateInDateFormat(start_date);
        const end_date_formated = this.convertStringDateInDateFormat(end_date);
        if(start_date_formated === null || end_date_formated === null) {
            return null;
        }

        return await PresenceRepository.getAvailableUsersForAPeriod(start_date_formated, end_date_formated);

    }

    public async updatePresenceUpdateOption(id_user: number, date: string, props: PresenceUpdateOption): Promise<PresenceInstance |  null> {
        const user__to_modify = UserRepository.getUserById(id_user);

        if(user__to_modify === null) {
            return null;
        }

        const date_formated = this.convertStringDateInDateFormat(date);
        if(date_formated === null) {
            return null;
        }
        
        const presence_line = await PresenceRepository.getPresenceLineForADate(id_user, date_formated);
        
        if(presence_line === null) {
            
            return await this.createPresenceLine(id_user, date_formated, props);
        }
        
        return await PresenceRepository.updatePresenceLine(id_user, date_formated, this.getFormatedUpdateOption(props));
    }

    private async createPresenceLine(id_user: number, date: Date, props: PresenceUpdateOption): Promise<PresenceInstance |  null> {

        if(props.is_available === undefined)
            props.is_available = true;
        return PresenceRepository.createPresenceLine(id_user, date, this.getFormatedUpdateOption(props));
    }

    private getFormatedUpdateOption(props: PresenceUpdateOption): JSON {

        if(props.is_worked === undefined)
            delete props.is_worked;
        if(props.is_programmed === undefined)
            delete props.is_programmed;
        if(props.is_available === undefined)
            delete props.is_available;

        return JSON.parse(JSON.stringify(props));
    }

    private getFormatedGetOption(props: PresenceUpdateOption): JSON {

        if(props.is_worked === undefined)
            delete props.is_worked;
        if(props.is_programmed === undefined)
            delete props.is_programmed;
        if(props.is_available === undefined)
            delete props.is_available;

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