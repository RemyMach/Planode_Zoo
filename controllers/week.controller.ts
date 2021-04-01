import { ModelCtor } from "sequelize";
import { UserInstance, UserUpdateOptions, UserUpdatePasswordOptions } from "../models/user.model";
import {SequelizeManager} from "../models";
import { WeekInstance, WeekProps, WeekCreateOption } from "../models/week.model";
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

        let date: Date | number = await this.week.max('end_date');
        
        if(typeof date == "number") {
            
            date = new Date();
        }
        
        this.setTheDateToThenextDayOfWeekThatYouChoose(1, date);

        const table: WeekCreateOption[]  = this.generateAYearOfWeekFromADate(date);

        await this.week.bulkCreate(table);
        
        return null;
    }

    private generateAYearOfWeekFromADate(date: Date): WeekCreateOption[] {
        
        const number_of_week_in_a_year = 52;
        const number_of_incrementing_day_for_day_miness_one = 6;
        const number_of_incrementing_day_to_go_to_start_day = 1;
        let table: WeekCreateOption[]  = [];
        for(let i = 0; i<number_of_week_in_a_year; i++) {
            let start_date = new Date(date);
            date.setDate(date.getDate() + number_of_incrementing_day_for_day_miness_one);
            if(date.getUTCHours() !== 0)
                date.setUTCHours(0, 0, 0, 0);
            table.push({start_date: start_date, end_date: new Date(date)});
            date.setDate(date.getDate() + number_of_incrementing_day_to_go_to_start_day);
        }

        return table;
    }

    private setTheDateToThenextDayOfWeekThatYouChoose(day_number_of_the_week: number, date: Date): void {
        
        while(date.getDay() !== day_number_of_the_week) {
            date.setDate(date.getDate() + 1);
        }
    }
}