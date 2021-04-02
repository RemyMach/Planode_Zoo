import { ModelCtor } from "sequelize";
import { SequelizeManager } from "../models";
import { AnimalInstance, AnimalUpdateProps } from "../models/animal.model";
import { SpeciesInstance } from "../models/species.model";
import { RaceInstance } from "../models/race.model";
import { AnimalRepository } from "../repositories/animal.repository";

export class AnimalController {

    animal: ModelCtor<AnimalInstance>;
    race: ModelCtor<RaceInstance>;
    species: ModelCtor<SpeciesInstance>;

    private static instance: AnimalController;

    public static async getInstance(): Promise<AnimalController> {
        if(AnimalController.instance === undefined) {
            const { animal, race, species } = await SequelizeManager.getInstance();
            AnimalController.instance = new AnimalController(animal, race, species);
        }
        return AnimalController.instance;
    }

    private constructor(animal: ModelCtor<AnimalInstance>, race: ModelCtor<RaceInstance>, species: ModelCtor<SpeciesInstance>) {
        this.animal = animal;
        this.race = race;
        this.species = species;
    }

    public async getAll(offset: number | undefined, limit: number | undefined): Promise<AnimalInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await AnimalRepository.getAllAnimals(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getAnimalById(id: number): Promise<AnimalInstance | null> {
        const animal = await AnimalRepository.getAnimalById(id);

        if(animal !== null) {
            return animal;
        }

        return null;
    }

    public async getAnimalByName(name: string): Promise<AnimalInstance | null> {
        const animal = await AnimalRepository.getAnimalByName(name);

        if(animal !== null) {
            return animal;
        }

        return null;
    }

    public async updateAnimal(id: number, props: AnimalUpdateProps): Promise<AnimalInstance | null> {
        return await AnimalRepository.updateAnimal(id, props);
    }
}