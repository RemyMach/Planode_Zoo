import { SequelizeManager } from "../../models";
import { fixture } from "./fixture";
import { LocationInstance } from "../../models/location.model";
import { AnimalFixture } from "./animal.fixture";

export class LocationFixture implements fixture{

    location_savanna_one?: LocationInstance;
    location_savanna_two?: LocationInstance;
    location_savanna_three?: LocationInstance;
    location_aviary_one?: LocationInstance
    location_aviary_two?: LocationInstance

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

        this.location_savanna_one = await manager.location.create({
            in_use: true
        });
        await this.location_savanna_one.setAnimal(animalFixture.animal_windows_is_better);

        this.location_savanna_two = await manager.location.create({
            in_use: true
        });
        await this.location_savanna_two.setAnimal(animalFixture.animal_java);

        this.location_savanna_three = await manager.location.create({
            in_use: true
        });
        await this.location_savanna_three.setAnimal(animalFixture.animal_dwight);

        this.location_aviary_one = await manager.location.create({
            in_use: true
        });
        await this.location_aviary_one.setAnimal(animalFixture.animal_wilhelm);

        this.location_aviary_two = await manager.location.create({
            in_use: false
        });
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