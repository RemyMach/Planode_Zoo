import { ModelCtor } from "sequelize";
import { SequelizeManager } from "../models";
import { AnimalInstance } from "../models/animal.model";
import { SpeciesInstance } from "../models/species.model";
import { RaceInstance, RaceUpdateProps } from "../models/race.model";
import { RaceRepository } from "../repositories/race.repository";

export class RaceController {

    animal: ModelCtor<AnimalInstance>;
    race: ModelCtor<RaceInstance>;
    species: ModelCtor<SpeciesInstance>;

    private static instance: RaceController;

    public static async getInstance(): Promise<RaceController> {
        if(RaceController.instance === undefined) {
            const { animal, race, species } = await SequelizeManager.getInstance();
            RaceController.instance = new RaceController(animal, race, species);
        }
        return RaceController.instance;
    }

    private constructor(animal: ModelCtor<AnimalInstance>, race: ModelCtor<RaceInstance>, species: ModelCtor<SpeciesInstance>) {
        this.animal = animal;
        this.race = race;
        this.species = species;
    }

    public async getAll(offset: number | undefined, limit: number | undefined): Promise<RaceInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await RaceRepository.getAllRaces(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getRaceById(id: number): Promise<RaceInstance | null> {
        const race = await RaceRepository.getRaceById(id);

        if(race !== null) {
            return race;
        }

        return null;
    }

    public async getRaceByBreed(breed: string): Promise<RaceInstance | null> {
        const race = await RaceRepository.getRaceByBreed(breed);

        if(race !== null) {
            return race;
        }

        return null;
    }

    public async updateRace(id: number, props: RaceUpdateProps): Promise<RaceInstance | null> {
        return await RaceRepository.updateRace(id, props);
    }
}