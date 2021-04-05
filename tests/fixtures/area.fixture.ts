import { SequelizeManager } from "../../models";
import { fixture } from "./fixture";
import { AreaInstance } from "../../models/area.model";
import { LocationFixture } from "./location.fixture";

export class AreaFixture implements fixture{

    area_savanna?: AreaInstance;
    area_aviary?: AreaInstance;

    private static instance: AreaFixture;

    public static async getInstance(): Promise<AreaFixture> {
        if(AreaFixture.instance === undefined) {
            AreaFixture.instance = new AreaFixture();
        }
        return AreaFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const locationFixture = await LocationFixture.getInstance();

        this.area_savanna = await manager.area.create({
            name: "savanna park",
            description: "discover africa's wildlife in his natural habitat",
            surface: 90,
            best_month: 6
        });
        this.area_savanna.addLocation(locationFixture.location_savanna_one);
        this.area_savanna.addLocation(locationFixture.location_savanna_two);
        this.area_savanna.addLocation(locationFixture.location_savanna_three);

        this.area_aviary = await manager.area.create({
            name: "the golden cage",
            description: "meet the world most beautiful eagle, the golden eagle",
            surface: 60,
            best_month: 3
        });
        this.area_aviary.addLocation(locationFixture.location_aviary_one);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.animal.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.animal.destroy({
            truncate: true,
            force: true
        });
    }
}