import { SequelizeManager } from "../../models";
import { fixture } from "./fixture";
import { ConditionInstance } from "../../models/condition.model";
import {StatusInstance} from "../../models/status.model";
import {AreaFixture} from "./area.fixture";
import {ConditionController} from "../../controllers/condition.controller";

export class ConditionFixture implements fixture{

    condition_of_avanna?: Promise<ConditionInstance | null>;
    condition_of_aviary?: Promise<ConditionInstance | null>;

    status_open?: StatusInstance;
    status_in_maintenance?: StatusInstance;

    private static instance: ConditionFixture;

    public static async getInstance(): Promise<ConditionFixture> {
        if(ConditionFixture.instance === undefined) {
            ConditionFixture.instance = new ConditionFixture();
        }
        return ConditionFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const conditionController = await ConditionController.getInstance();
        const areaFixture = await AreaFixture.getInstance();

        this.status_open = await manager.status.create({
            label: "Open"
        });
        this.status_in_maintenance = await manager.status.create({
            label: "In maintenance"
        });

        if(areaFixture.area_aviary !== undefined)
        {
            this.condition_of_aviary = conditionController.addStatusToArea(areaFixture.area_aviary, this.status_open, new Date(2021, 1, 20));
        }

        if(areaFixture.area_savanna !== undefined)
        {
            this.condition_of_avanna = conditionController.addStatusToArea(areaFixture.area_savanna, this.status_in_maintenance, new Date(2021, 2, 12));
        }
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();

        await manager.condition.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.condition.destroy({
            truncate: true,
            force: true
        });

        await manager.status.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.status.destroy({
            truncate: true,
            force: true
        });
    }
}
