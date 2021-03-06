import {RaceInstance, RaceUpdateProps} from "../models/race.model";
import {RaceController} from "../controllers/race.controller";

export class RaceRepository {

    public static async createRace(props: RaceUpdateProps): Promise<RaceInstance | null> {
        const raceController = await RaceController.getInstance();
        return await raceController.race.create(props);
    }

    public static async getAllRaces(offset: number, limit: number): Promise<RaceInstance[]> {
        const raceController = await RaceController.getInstance();
        return await raceController.race.findAll({
            attributes: ['id', 'breed'],
            offset,
            limit
        });
    }

    public static async getAllRacesDetails(offset: number, limit: number): Promise<RaceInstance[]> {
        const raceController = await RaceController.getInstance();
        return await raceController.race.findAll({
            attributes: ['id', 'breed'],
            include: [{
                model: raceController.animal,
                attributes: ['id', 'name']
            }, {
                model: raceController.species,
                attributes: ['id', 'name']
            }],
            offset,
            limit
        });
    }

    public static async getRaceById(id: number): Promise<RaceInstance | null> {
        const raceController = await RaceController.getInstance();

        return  await raceController.race.findOne({
            attributes: ['id', 'breed'],
            where: {
                id
            }
        });
    }

    public static async getRaceDetailsById(id: number): Promise<RaceInstance | null> {
        const raceController = await RaceController.getInstance();

        return  await raceController.race.findOne({
            attributes: ['id', 'breed'],
            include: [{
                model: raceController.animal,
                attributes: ['id', 'name']
            }, {
                model: raceController.species,
                attributes: ['id', 'name']
            }],
            where: {
                id
            }
        });
    }

    public static async getRaceByBreed(breed: string): Promise<RaceInstance | null> {
        const raceController = await RaceController.getInstance();

        return  await raceController.race.findOne({
            attributes: ['id', 'breed'],
            where: {
                breed
            }
        });
    }

    public static async getRaceDetailsByBreed(breed: string): Promise<RaceInstance | null> {
        const raceController = await RaceController.getInstance();

        return  await raceController.race.findOne({
            attributes: ['id', 'breed'],
            include: [{
                model: raceController.animal,
                attributes: ['id', 'name']
            }, {
                model: raceController.species,
                attributes: ['id', 'name']
            }],
            where: {
                breed
            }
        });
    }

    public static async updateRace(id: number, props: RaceUpdateProps): Promise<RaceInstance | null> {
        const raceController = await RaceController.getInstance();
        const race = await raceController.getRaceById(id, false);

        const props_convert = JSON.parse(JSON.stringify(props));

        if(race === undefined || race?.id === undefined) {
            return null;
        }
        await raceController.race.update(
            props_convert,
            {
                where: {
                    id: race.id
                }
            });

        return await raceController.getRaceById(id, false);
    }

    public static async deleteRace(id: number): Promise<boolean> {
        const raceController = await RaceController.getInstance();
        await raceController.race.destroy({
            where: {
                id
            }
        });

        const race = await raceController.getRaceById(id, false);
        return race === null;
    }
}