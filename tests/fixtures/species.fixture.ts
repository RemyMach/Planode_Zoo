import { SequelizeManager } from "../../models";
import { SpeciesInstance } from "../../models/species.model";
import { fixture } from "./fixture";

export class SpeciesFixture implements fixture{

    species_snake?: SpeciesInstance;
    species_wild_cat?: SpeciesInstance;
    species_eagle?: SpeciesInstance;

    private static instance: SpeciesFixture;

    public static async getInstance(): Promise<SpeciesFixture> {
        if(SpeciesFixture.instance === undefined) {
            SpeciesFixture.instance = new SpeciesFixture();
        }
        return SpeciesFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();

        this.species_snake = await manager.species.create({
            name: "snake"
        });
        this.species_wild_cat = await manager.species.create({
            name: "wild cat"
        });
        this.species_eagle = await manager.species.create({
            name: "eagle"
        });
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.race.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.species.destroy({
            truncate: true,
            force: true
        });
    }
}