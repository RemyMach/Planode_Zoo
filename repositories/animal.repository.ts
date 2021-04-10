import {AnimalController} from "../controllers/animal.controller";
import {AnimalInstance, AnimalUpdateProps} from "../models/animal.model";

export class AnimalRepository {

    public static async createAnimal(props: AnimalUpdateProps): Promise<AnimalInstance | null> {
        const animalController = await AnimalController.getInstance();
        return await animalController.animal.create(props);
    }

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
            }, {
                model: animalController.location,
                attributes: ['id', 'entry_date', 'exit_date'],
                include: [{
                    model: animalController.area,
                    attributes: ['id', 'name']
                }]
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
            }, {
                model: animalController.location,
                attributes: ['id', 'entry_date', 'exit_date'],
                include: [{
                    model: animalController.area,
                    attributes: ['id', 'name']
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
            }, {
                model: animalController.location,
                attributes: ['id', 'entry_date', 'exit_date'],
                include: [{
                    model: animalController.area,
                    attributes: ['id', 'name']
                }]
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

    public static async deleteAnimal(id: number): Promise<boolean> {
        const animalController = await AnimalController.getInstance();
        await animalController.animal.destroy({
            where: {
                id
            }
        });

        const species = await animalController.getAnimalById(id, false);
        return species === null;
    }
}