import { WeekController } from "../controllers/week.controller";
import {WeekCreateOption, WeekInstance}  from "../models/week.model";
import { RoleInstance, RoleUpdateOption } from "../models/role.model";

export class WeekReository {


    public static async addAYearSinceTheLastWeekinTheDB(table_of_week: WeekCreateOption[]): Promise<void | null> {
        const weekController = await WeekController.getInstance();
        const count_before = await weekController.week.count();

        await weekController.week.bulkCreate(table_of_week);

        const count_after = await weekController.week.count();

        if(count_after === count_before + table_of_week.length) {
            return;
        }
        
        return null; 
    }

    public static async getTheLastWeekInTheDB(): Promise< Date | number> {
        const weekController = await WeekController.getInstance();
        return await weekController.week.max('end_date');
    }

    public static async getWeekByTheStartDate(start_date: Date): Promise< WeekInstance | null> {
        const weekController = await WeekController.getInstance();
        console.log(start_date);
        
        return await weekController.week.findOne({
            where: {
                start_date
            }
        })
    }
}