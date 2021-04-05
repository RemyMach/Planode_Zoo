import { AnimalController } from "../controllers/animal.controller";
import { AnimalInstance, AnimalUpdateProps } from "../models/animal.model";

export class AnimalRepository {

    public static async getAllAnimals(offset: number, limit: number): Promise<AnimalInstance[]> {
        const animalController = await AnimalController.getInstance();
        return await animalController.animal.findAll({
            attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
            offset,
            limit
        });
    }

    public static async getAllDetailsAnimals(offset: number, limit: number): Promise<AnimalInstance[]> {
        const animalController = await AnimalController.getInstance();
        return await animalController.animal.findAll({
            attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
            include: [{
                model: animalController.race,
                attributes: ['id', 'breed'],
                include: [{
                    model: animalController.species,
                    attributes: ['id', 'name']
                }]
            }, {
                model: animalController.healthcare,
                attributes: ['id', 'date', 'name', 'notes', 'cost', 'success']
            }],
            offset,
            limit
        });
    }

    public static async getAnimalById(id: number): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();

        return  await animalController.animal.findOne({
            attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
            where: {
                id
            }
        });
    }

    public static async getAnimalDetailsById(id: number): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();

        return  await animalController.animal.findOne({
            attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
            include: [{
                model: animalController.race,
                attributes: ['id', 'breed'],
                include: [{
                    model: animalController.species,
                    attributes: ['id', 'name']
                }]
            }, {
                model: animalController.healthcare,
                attributes: ['id', 'date', 'name', 'notes', 'cost', 'success']
            }],
            where: {
                id
            }
        });
    }

    public static async getAnimalByName(name: string): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();

        return  await animalController.animal.findOne({
            attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
            where: {
                name
            }
        });
    }

    public static async getAnimalDetailsByName(name: string): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();

        return  await animalController.animal.findOne({
            attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
            include: [{
                model: animalController.race,
                attributes: ['id', 'breed'],
                include: [{
                    model: animalController.species,
                    attributes: ['id', 'name']
                }]
            }, {
                model: animalController.healthcare,
                attributes: ['id', 'date', 'name', 'notes', 'cost', 'success']
            }],
            where: {
                name
            }
        });
    }

    public static async updateAnimal(id: number, props: AnimalUpdateProps): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();
        const animal = await animalController.getAnimalById(id, false);

        const props_convert = JSON.parse(JSON.stringify(props));

        if(animal === undefined || animal?.id === undefined) {
            return null;
        }
        await animalController.animal.update(
            props_convert,
            {
                where: {
                    id: animal.id
                }
            });

        return await animalController.getAnimalById(id, false);
    }
}