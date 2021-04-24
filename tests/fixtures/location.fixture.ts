import {SequelizeManager} from "../../models";
import {fixture} from "./fixture";
import {LocationInstance} from "../../models/location.model";
import {AnimalFixture} from "./animal.fixture";
import {AreaFixture} from "./area.fixture";

export class LocationFixture implements fixture{

    location_savanna_one?: LocationInstance;
    location_savanna_two?: LocationInstance;
    location_savanna_three?: LocationInstance;
    location_aviary_one?: LocationInstance

    private static instance: LocationFixture;

    public static async getInstance(): Promise<LocationFixture> {
        if(LocationFixture.instance === undefined) {
            LocationFixture.instance = new LocationFixture();
        }
        return LocationFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const animalFixture = await AnimalFixture.getInstance();
        const areaFixture = await AreaFixture.getInstance();

        this.location_savanna_one = await manager.location.create({
            entry_date: new Date("2006-01-17"),
            exit_date: null
        });
        await this.location_savanna_one.setAnimal(animalFixture.animal_windows_is_better);
        await this.location_savanna_one.setArea(areaFixture.area_savanna);

        this.location_savanna_two = await manager.location.create({
            entry_date: new Date("2006-08-24"),
            exit_date: null
        });
        await this.location_savanna_two.setAnimal(animalFixture.animal_java);
        await this.location_savanna_two.setArea(areaFixture.area_savanna);

        this.location_savanna_three = await manager.location.create({
            entry_date: new Date("2007-02-01"),
            exit_date: null
        });
        await this.location_savanna_three.setAnimal(animalFixture.animal_dwight);
        await this.location_savanna_three.setArea(areaFixture.area_savanna);

        this.location_aviary_one = await manager.location.create({
            entry_date: new Date("2007-09-20"),
            exit_date: null
        });
        await this.location_aviary_one.setAnimal(animalFixture.animal_wilhelm);
        await this.location_aviary_one.setArea(areaFixture.area_aviary);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.location.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.location.destroy({
            truncate: true,
            force: true
        });
    }
}