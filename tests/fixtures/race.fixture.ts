import { SequelizeManager } from "../../models";
import { fixture } from "./fixture";
import { RaceInstance } from "../../models/race.model";
import { SpeciesFixture } from "./species.fixture";

export class RaceFixture implements fixture{

    race_python?: RaceInstance;
    race_serval?: RaceInstance;
    race_ocelot?: RaceInstance;
    race_golden_eagle?: RaceInstance

    private static instance: RaceFixture;

    public static async getInstance(): Promise<RaceFixture> {
        if(RaceFixture.instance === undefined) {
            RaceFixture.instance = new RaceFixture();
        }
        return RaceFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const speciesFixture = await SpeciesFixture.getInstance();

        this.race_python = await manager.race.create({
            breed: "python"
        });
        await this.race_python.setSpecies(speciesFixture.species_snake);

        this.race_serval = await manager.race.create({
            breed: "serval"
        });
        await this.race_serval.setSpecies(speciesFixture.species_wild_cat);

        this.race_ocelot = await manager.race.create({
            breed: "ocelot"
        });
        await this.race_ocelot.setSpecies(speciesFixture.species_wild_cat);

        this.race_golden_eagle = await manager.race.create({
            breed: "golden eagle"
        });
        await this.race_golden_eagle.setSpecies(speciesFixture.species_eagle);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.race.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.race.destroy({
            truncate: true,
            force: true
        });
    }
}