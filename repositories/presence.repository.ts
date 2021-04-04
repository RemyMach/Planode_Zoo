import { WeekController } from "../controllers/week.controller";
import {WeekCreateOption, WeekInstance}  from "../models/week.model";
import { PresenceController } from "../controllers/presence.controller";
import { PresenceInstance, PresenceUpdateOption } from "../models/presence.model";
import { UserInstance } from "../models/user.model";
import { Json } from "sequelize/types/lib/utils";
import { UserRepository } from "./user.repository";
import { WeekReository } from "./week.repository";
import { PassThrough } from "node:stream";

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

    public static async updatePresenceLine(id_user: number, date: Date, props: any): Promise<PresenceInstance | null> {
        const presenceController = await PresenceController.getInstance();
        const user = await this.getPresenceLineForADate(id_user, date);
        if(user === null) {
            return null;
        }

        console.log(props);
        
        const json = JSON.parse(JSON.stringify(user));
        const id_presence = json['Weeks'][0]['Presence']['id'];
        const res =  await presenceController.presence.update(
            props,
            {
                where: {
                    id: id_presence,
                    is_available: true
                },
                returning: false,
            },
        );

        return await presenceController.presence.findByPk(id_presence, {attributes: ['is_programmed', 'is_worked', 'is_available']});
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

    public static async createPresenceLine(id_user: number, date: Date, props: any): Promise<PresenceInstance | null> {
        const presenceController = await PresenceController.getInstance();
        const user = await UserRepository.getUserById(id_user);
        const week = await WeekReository.getWeekByTheStartDate(date);
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