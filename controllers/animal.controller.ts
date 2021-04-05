import { ModelCtor } from "sequelize";
import { SequelizeManager } from "../models";
import { AnimalInstance, AnimalUpdateProps } from "../models/animal.model";
import { SpeciesInstance } from "../models/species.model";
import { RaceInstance } from "../models/race.model";
import { AnimalRepository } from "../repositories/animal.repository";
import {HealthcareInstance} from "../models/healthcare.model";

export class AnimalController {

    animal: ModelCtor<AnimalInstance>;
    race: ModelCtor<RaceInstance>;
    species: ModelCtor<SpeciesInstance>;
    healthcare: ModelCtor<HealthcareInstance>;

    private static instance: AnimalController;

    public static async getInstance(): Promise<AnimalController> {
        if(AnimalController.instance === undefined) {
            const { animal, race, species, healthcare } = await SequelizeManager.getInstance();
            AnimalController.instance = new AnimalController(animal, race, species, healthcare);
        }
        return AnimalController.instance;
    }

    private constructor(animal: ModelCtor<AnimalInstance>, race: ModelCtor<RaceInstance>, species: ModelCtor<SpeciesInstance>, healthcare: ModelCtor<HealthcareInstance>) {
        this.animal = animal;
        this.race = race;
        this.species = species;
        this.healthcare = healthcare;
    }

    public async getAll(offset: number | undefined, limit: number | undefined, details: boolean): Promise<AnimalInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        let res: AnimalInstance[];
        if (details) {
            res =  await AnimalRepository.getAllDetailsAnimals(offset, limit);
        } else {
            res = await AnimalRepository.getAllAnimals(offset, limit);
        }

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getAnimalById(id: number, details: boolean): Promise<AnimalInstance | null> {
        let animal: AnimalInstance | null;
        if (details) {
            animal = await AnimalRepository.getAnimalDetailsById(id);
        } else {
            animal = await AnimalRepository.getAnimalById(id);
        }

        if(animal !== null) {
            return animal;
        }

        return null;
    }

    public async getAnimalByName(name: string, details: boolean): Promise<AnimalInstance | null> {
        let animal: AnimalInstance | null;
        if (details) {
            animal = await AnimalRepository.getAnimalDetailsByName(name);
        } else {
            animal = await AnimalRepository.getAnimalByName(name);
        }

        if(animal !== null) {
            return animal;
        }

        return null;
    }

    public async updateAnimal(id: number, props: AnimalUpdateProps): Promise<AnimalInstance | null> {
        return await AnimalRepository.updateAnimal(id, props);
    }
}