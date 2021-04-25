import {SequelizeManager} from "../../models";
import {fixture} from "./fixture";
import {MaintainInstance} from "../../models/maintain.model";
import {AreaFixture} from "./area.fixture";
import {UserFixture} from "./user.fixture";
import { PresenceInstance } from "../../models/presence.model";
import {WeekRepository} from "../../repositories/week.repository";

export class PresenceFixture implements fixture{

    

    private static instance: PresenceFixture;

    public static async getInstance(): Promise<PresenceFixture> {
        if(PresenceFixture.instance === undefined) {
            PresenceFixture.instance = new PresenceFixture();
        }
        return PresenceFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const userFixture = await UserFixture.getInstance();

        // Week Worked
        const date0 = new Date("2021-05-03");
        date0.setUTCHours(0,0,0,0);
        
        const week0 = await WeekRepository.getWeekByTheStartDate(date0);

        
        if(week0 === null) {
            return;
        }
        
        await userFixture.user_admin_receptionist?.addWeek(week0,{through: {is_available: true, is_programmed: true, is_worked: true}});
    
        await userFixture.user_normal_service_agent?.addWeek(week0,{through: {is_available: true, is_programmed: true, is_worked: true}});

        await userFixture.user_normal_healer?.addWeek(week0,{through: {is_available: true, is_programmed: true, is_worked: true}});

        await userFixture.user_admin_seller?.addWeek(week0,{through: {is_available: true, is_programmed: true, is_worked: true}});

        // Week 1
        const date1 = new Date("2021-05-10");
        date1.setUTCHours(0,0,0,0);
        
        const week1 = await WeekRepository.getWeekByTheStartDate(date1);

        
        if(week1 === null) {
            return;
        }
        
        await userFixture.user_admin_receptionist?.addWeek(week1,{through: {is_available: true, is_programmed: true}});
    
        await userFixture.user_normal_service_agent?.addWeek(week1,{through: {is_available: true, is_programmed: true}});

        await userFixture.user_normal_healer?.addWeek(week1,{through: {is_available: true, is_programmed: true}});

        await userFixture.user_admin_seller?.addWeek(week1,{through: {is_available: true, is_programmed: true}});

        // Week 2
        const date2 = new Date("2021-05-17");
        date2.setUTCHours(0,0,0,0);
        
        const week2 = await WeekRepository.getWeekByTheStartDate(date2);
        
        if(week2 === null) {
            return;
        }

        await userFixture.user_normal_healer?.addWeek(week2,{through: {is_available: false, is_programmed: true}});

        await userFixture.user_normal_service_agent?.addWeek(week2,{through: {is_available: true, is_programmed: true}});
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.user.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.presence.destroy({
            truncate: true,
            force: true
        });
    }
}