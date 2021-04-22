import {SequelizeManager} from "../../models";
import {fixture} from "./fixture";
import {ConditionInstance} from "../../models/condition.model";
import {AreaFixture} from "./area.fixture";
import {ConditionController} from "../../controllers/condition.controller";
import {StatusFixture} from "./status.fixture";
import {ConditionRepository} from "../../repositories/condition.repository";

export class ConditionFixture implements fixture{

    condition_of_savanna?: Promise<ConditionInstance | null>;
    condition_of_aviary?: Promise<ConditionInstance | null>;

    private static instance: ConditionFixture;

    public static async getInstance(): Promise<ConditionFixture> {
        if(ConditionFixture.instance === undefined) {
            ConditionFixture.instance = new ConditionFixture();
        }
        return ConditionFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void>
    {
        const conditionController = await ConditionController.getInstance();
        const areaFixture = await AreaFixture.getInstance();
        const statusFixture = await StatusFixture.getInstance();

        if(areaFixture.area_aviary !== undefined && statusFixture.status_open !== undefined)
        {
            const date = await ConditionRepository.fixDateType(new Date(2021, 1, 20));
            this.condition_of_aviary = conditionController.addStatusToArea(areaFixture.area_aviary, statusFixture.status_open, date);
        }

        if(areaFixture.area_savanna !== undefined && statusFixture.status_in_maintenance !== undefined)
        {
            const date = await ConditionRepository.fixDateType(new Date(2021, 2, 12));
            this.condition_of_savanna = conditionController.addStatusToArea(areaFixture.area_savanna, statusFixture.status_in_maintenance, date);
        }
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.condition.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.condition.destroy({
            truncate: true,
            force: true
        });
    }
}
