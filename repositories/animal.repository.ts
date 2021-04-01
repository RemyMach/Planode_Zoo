import { AnimalController } from "../controllers/animal.controller";
import { AnimalInstance, AnimalUpdateProps } from "../models/animal.model";

export class AnimalRepository {

    public static async getAllAnimals(offset: number, limit: number): Promise<AnimalInstance[]> {
        const animalController = await AnimalController.getInstance();
        return await animalController.animal.findAll({
            attributes: ['name', 'birthdate', 'height', 'weight'],
            include: [{
                model: animalController.race,
                attributes: ['breed'],
                include: [{
                    model: animalController.species,
                    attributes: ['name']
                }]
            }],
            offset,
            limit
        });

    }

    public static async getAnimalById(id: number): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();

        return  await animalController.animal.findOne({
            attributes: ['name', 'birthdate', 'height', 'weight'],
            include: [{
                model: animalController.race,
                attributes: ['breed'],
                include: [{
                    model: animalController.species,
                    attributes: ['name']
                }]
            }],
            where: {
                id
            }
        });
    }

    public static async getAnimalByName(name: string): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();

        return  await animalController.animal.findOne({
            attributes: ['name', 'birthdate', 'height', 'weight'],
            include: [{
                model: animalController.race,
                attributes: ['breed'],
                include: [{
                    model: animalController.species,
                    attributes: ['name']
                }]
            }],
            where: {
                name
            }
        });
    }

    public static async updateAnimal(id: number, props: AnimalUpdateProps): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();
        const animal = await animalController.getAnimalById(id);

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

        return await animalController.getAnimalById(id);
    }
}