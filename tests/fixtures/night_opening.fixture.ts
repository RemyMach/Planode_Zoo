import {fixture} from "./fixture";
import {NightOpeningInstance} from "../../models/night_opening.model";
import {SequelizeManager} from "../../models";
import {NightOpeningRepository} from "../../repositories/night_opening.repository";

export class NightOpeningFixture implements fixture
{
    nightOpening1?: NightOpeningInstance;
    nightOpening2?: NightOpeningInstance;

    private static instance: NightOpeningFixture;

    public static async getInstance(): Promise<NightOpeningFixture> {
        if(NightOpeningFixture.instance === undefined) {
            NightOpeningFixture.instance = new NightOpeningFixture();
        }
        return NightOpeningFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void>
    {
        const manager = await SequelizeManager.getInstance();

        const new_closing_date1 = await NightOpeningRepository.fixDateType(new Date(2020, 9, 5));
        new_closing_date1.setUTCHours(0, 30);
        this.nightOpening1 = await manager.night_opening.create({
            new_closing_date: new_closing_date1
        });

        const new_closing_date2 = await NightOpeningRepository.fixDateType(new Date(2021, 3, 4));
        new_closing_date2.setUTCHours(0, 30);
        this.nightOpening2 = await manager.night_opening.create({
            new_closing_date: new_closing_date2
        });
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.night_opening.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.night_opening.destroy({
            truncate: true,
            force: true
        });
    }
}
