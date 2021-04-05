import {SpeciesInstance, SpeciesUpdateProps} from "../models/species.model";
import { SpeciesController } from "../controllers/species.controller";

export class SpeciesRepository {

    public static async getAllSpecies(offset: number, limit: number): Promise<SpeciesInstance[]> {
        const speciesController = await SpeciesController.getInstance();
        return await speciesController.species.findAll({
            attributes: ['id', 'name'],
            offset,
            limit
        });
    }

    public static async getAllSpeciesDetails(offset: number, limit: number): Promise<SpeciesInstance[]> {
        const speciesController = await SpeciesController.getInstance();
        return await speciesController.species.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: speciesController.race,
                attributes: ['id', 'breed'],
                include: [{
                    model: speciesController.animal,
                    attributes: ['id', 'name']
                }]
            }],
            offset,
            limit
        });
    }

    public static async getSpeciesById(id: number): Promise<SpeciesInstance | null> {
        const speciesController = await SpeciesController.getInstance();

        return  await speciesController.species.findOne({
            attributes: ['id', 'name'],
            where: {
                id
            }
        });
    }

    public static async getSpeciesDetailsById(id: number): Promise<SpeciesInstance | null> {
        const speciesController = await SpeciesController.getInstance();

        return  await speciesController.species.findOne({
            attributes: ['id', 'name'],
            include: [{
                model: speciesController.race,
                attributes: ['id', 'breed'],
                include: [{
                    model: speciesController.animal,
                    attributes: ['id', 'name']
                }]
            }],
            where: {
                id
            }
        });
    }

    public static async getSpeciesByName(name: string): Promise<SpeciesInstance | null> {
        const speciesController = await SpeciesController.getInstance();

        return  await speciesController.species.findOne({
            attributes: ['id', 'name'],
            where: {
                name
            }
        });
    }

    public static async getSpeciesDetailsByName(name: string): Promise<SpeciesInstance | null> {
        const speciesController = await SpeciesController.getInstance();

        return  await speciesController.species.findOne({
            attributes: ['id', 'name'],
            include: [{
                model: speciesController.race,
                attributes: ['id', 'breed'],
                include: [{
                    model: speciesController.animal,
                    attributes: ['id', 'name']
                }]
            }],
            where: {
                name
            }
        });
    }

    public static async updateSpecies(id: number, props: SpeciesUpdateProps): Promise<SpeciesInstance | null> {
        const speciesController = await SpeciesController.getInstance();
        const species = await speciesController.getSpeciesById(id, false);

        const props_convert = JSON.parse(JSON.stringify(props));

        if(species === undefined || species?.id === undefined) {
            return null;
        }
        await speciesController.species.update(
            props_convert,
            {
                where: {
                    id: species.id
                }
            });

        return await speciesController.getSpeciesById(id, false);
    }
}