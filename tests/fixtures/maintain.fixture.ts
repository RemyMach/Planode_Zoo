import { SequelizeManager } from "../../models";
import { fixture } from "./fixture";
import { MaintainInstance } from "../../models/maintain.model";
import { AreaFixture } from "./area.fixture";
import { UserFixture } from "./user.fixture";

export class MaintainFixture implements fixture{

    maintain_area_savanna?: MaintainInstance;
    maintain_area_aviary?: MaintainInstance;

    private static instance: MaintainFixture;

    public static async getInstance(): Promise<MaintainFixture> {
        if(MaintainFixture.instance === undefined) {
            MaintainFixture.instance = new MaintainFixture();
        }
        return MaintainFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const areaFixture = await AreaFixture.getInstance();
        const userFixture = await UserFixture.getInstance();

        const start_date_savana  = this.convertStringDateInDateFormat("05/17/2021");
        const end_date_savana  = this.convertStringDateInDateFormat("05/23/2021");

        this.maintain_area_savanna = await manager.maintain.create({
            start_date: start_date_savana,
            end_date: end_date_savana
        });

        await this.maintain_area_savanna.setArea(areaFixture.area_savanna);
        await this.maintain_area_savanna.addUser(userFixture.user_normal);

        const start_date_aviary = this.convertStringDateInDateFormat("05/17/2021");
        const end_date_aviary  = this.convertStringDateInDateFormat("05/23/2021");

        this.maintain_area_aviary = await manager.maintain.create({
            start_date: start_date_aviary,
            end_date: end_date_aviary
        });
        await this.maintain_area_aviary.setArea(areaFixture.area_aviary);
        await this.maintain_area_aviary.addUser(userFixture.user_normal_healer);


    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.maintain.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.maintain.destroy({
            truncate: true,
            force: true
        });
    }

    private convertStringDateInDateFormat(date: string): Date {
        try{
            const new_date = new Date(date);
            new_date.setUTCHours(0, 0, 0, 0);
            new_date.setDate((new_date.getDate() + 1))
            return new_date;
        }catch {
            return new Date();
        }
    }
}