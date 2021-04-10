import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {AnimalInstance} from "../models/animal.model";
import {SpeciesInstance, SpeciesUpdateProps} from "../models/species.model";
import {RaceInstance} from "../models/race.model";
import {SpeciesRepository} from "../repositories/species.repository";

export class SpeciesController {

    animal: ModelCtor<AnimalInstance>;
    race: ModelCtor<RaceInstance>;
    species: ModelCtor<SpeciesInstance>;

    private static instance: SpeciesController;

    public static async getInstance(): Promise<SpeciesController> {
        if(SpeciesController.instance === undefined) {
            const { animal, race, species } = await SequelizeManager.getInstance();
            SpeciesController.instance = new SpeciesController(animal, race, species);
        }
        return SpeciesController.instance;
    }

    private constructor(animal: ModelCtor<AnimalInstance>, race: ModelCtor<RaceInstance>, species: ModelCtor<SpeciesInstance>) {
        this.animal = animal;
        this.race = race;
        this.species = species;
    }

    public async createSpecies(props: SpeciesUpdateProps): Promise<SpeciesInstance | null> {
        return await SpeciesRepository.createSpecies(props);
    }

    public async getAll(offset: number | undefined, limit: number | undefined, details: boolean): Promise<SpeciesInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        let res: SpeciesInstance[];
        if (details) {
            res = await SpeciesRepository.getAllSpeciesDetails(offset, limit);
        } else {
            res = await SpeciesRepository.getAllSpecies(offset, limit);
        }

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getSpeciesById(id: number, details: boolean): Promise<SpeciesInstance | null> {
        let species: SpeciesInstance | null;
        if (details) {
            species = await SpeciesRepository.getSpeciesDetailsById(id);
        } else {
            species = await SpeciesRepository.getSpeciesById(id);
        }

        if(species !== null) {
            return species;
        }

        return null;
    }

    public async getSpeciesByName(name: string, details: boolean): Promise<SpeciesInstance | null> {
        let species: SpeciesInstance | null;
        if (details) {
            species = await SpeciesRepository.getSpeciesDetailsByName(name);
        } else {
            species = await SpeciesRepository.getSpeciesByName(name);
        }

        if(species !== null) {
            return species;
        }

        return null;
    }

    public async updateSpecies(id: number, props: SpeciesUpdateProps): Promise<SpeciesInstance | null> {
        return await SpeciesRepository.updateSpecies(id, props);
    }

    public async deleteSpecies(id: number): Promise<boolean> {
        return await SpeciesRepository.deleteSpecies(id);
    }
}