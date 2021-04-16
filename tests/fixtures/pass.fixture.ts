import {fixture} from "./fixture";
import {PassInstance} from "../../models/pass.model";
import {PassController} from "../../controllers/pass.controller";
import {SequelizeManager} from "../../models";

export class PassFixture implements fixture
{
    day_pass?: Promise<PassInstance | null>;
    week_pass?: Promise<PassInstance | null>;
    one_day_per_month_pass?: Promise<PassInstance | null>;

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
        const passController = await PassController.getInstance();

        this.day_pass = passController.createPass(1, -1);
        this.week_pass = passController.createPass(7, -1);
        this.one_day_per_month_pass = passController.createPass(365, 1);
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
