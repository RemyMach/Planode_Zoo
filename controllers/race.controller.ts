import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {AnimalInstance} from "../models/animal.model";
import {SpeciesInstance} from "../models/species.model";
import {RaceInstance, RaceUpdateProps} from "../models/race.model";
import {RaceRepository} from "../repositories/race.repository";

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

    public async createRace(props: RaceUpdateProps): Promise<RaceInstance | null> {
        return await RaceRepository.createRace(props);
    }

    public async getAll(offset: number | undefined, limit: number | undefined, details: boolean): Promise<RaceInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        let res: RaceInstance[];
        if (details) {
            res = await RaceRepository.getAllRacesDetails(offset, limit);
        } else {
            res = await RaceRepository.getAllRaces(offset, limit);
        }

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getRaceById(id: number, details: boolean): Promise<RaceInstance | null> {
        let race: RaceInstance | null;
        if (details) {
            race = await RaceRepository.getRaceDetailsById(id);
        } else {
            race = await RaceRepository.getRaceById(id);
        }

        if(race !== null) {
            return race;
        }

        return null;
    }

    public async getRaceByBreed(breed: string, details: boolean): Promise<RaceInstance | null> {
        let race: RaceInstance | null;
        if (details) {
            race = await RaceRepository.getRaceDetailsByBreed(breed);
        } else {
            race = await RaceRepository.getRaceByBreed(breed);
        }

        if(race !== null) {
            return race;
        }

        return null;
    }

    public async updateRace(id: number, props: RaceUpdateProps): Promise<RaceInstance | null> {
        return await RaceRepository.updateRace(id, props);
    }

    public async deleteRace(id: number): Promise<boolean> {
        return await RaceRepository.deleteRace(id);
    }
}