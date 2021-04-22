import {fixture} from "./fixture";
import {PassInstance} from "../../models/pass.model";
import {SequelizeManager} from "../../models";

export class PassFixture implements fixture
{
    day_pass?: PassInstance;
    week_pass?: PassInstance;
    year_pass?: PassInstance;
    one_day_per_month_pass?: PassInstance;
    escape_game_pass?: PassInstance;
    night_pass?: PassInstance;
    no_area_pass?: PassInstance;

    private static instance: PassFixture;

    public static async getInstance(): Promise<PassFixture> {
        if(PassFixture.instance === undefined) {
            PassFixture.instance = new PassFixture();
        }
        return PassFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void>
    {
        const manager = await SequelizeManager.getInstance();

        this.day_pass = await manager.pass.create({
            number_of_days_of_validity: 1,
            number_of_use_per_month: -1,
            is_night_pass: false
        });
        this.week_pass = await manager.pass.create({
            number_of_days_of_validity: 7,
            number_of_use_per_month: -1,
            is_night_pass: false
        });
        this.one_day_per_month_pass = await manager.pass.create({
            number_of_days_of_validity: 365,
            number_of_use_per_month: 1,
            is_night_pass: false
        });
        this.escape_game_pass = await manager.pass.create({
            number_of_days_of_validity: 365,
            number_of_use_per_month: -1,
            is_night_pass: false
        });
        this.night_pass = await manager.pass.create({
            number_of_days_of_validity: 365,
            number_of_use_per_month: -1,
            is_night_pass: true
        });
        this.year_pass = await manager.pass.create({
            number_of_days_of_validity: 365,
            number_of_use_per_month: -1,
            is_night_pass: false
        });
        this.no_area_pass = await manager.pass.create({
            number_of_days_of_validity: 365,
            number_of_use_per_month: -1,
            is_night_pass: false
        });
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.pass.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.pass.destroy({
            truncate: true,
            force: true
        });
    }
}
