import {LocationInstance, LocationUpdateProps} from "../models/location.model";
import {LocationController} from "../controllers/location.controller";

export class LocationRepository {

    public static async getAllLocations(offset: number, limit: number): Promise<LocationInstance[]> {
        const locationController = await LocationController.getInstance();
        return await locationController.location.findAll({
            attributes: ['id', 'entry_date', 'exit_date'],
            offset,
            limit
        });
    }

    public static async getAllLocationsDetails(offset: number, limit: number): Promise<LocationInstance[]> {
        const locationController = await LocationController.getInstance();
        return await locationController.location.findAll({
            attributes: ['id', 'entry_date', 'exit_date'],
            include: [{
                model: locationController.area,
                attributes: ['id', 'name']
            }, {
                model: locationController.animal,
                attributes: ['id', 'name']
            }],
            offset,
            limit
        });
    }

    public static async getLocationById(id: number): Promise<LocationInstance | null> {
        const locationController = await LocationController.getInstance();

        return  await locationController.location.findOne({
            attributes: ['id', 'entry_date', 'exit_date'],
            where: {
                id
            }
        });
    }

    public static async getLocationDetailsById(id: number): Promise<LocationInstance | null> {
        const locationController = await LocationController.getInstance();

        return  await locationController.location.findOne({
            attributes: ['id', 'entry_date', 'exit_date'],
            include: [{
                model: locationController.area,
                attributes: ['id', 'name']
            }, {
                model: locationController.animal,
                attributes: ['id', 'name']
            }],
            where: {
                id
            }
        });
    }

    public static async updateLocation(id: number, props: LocationUpdateProps): Promise<LocationInstance | null> {
        const locationController = await LocationController.getInstance();
        const location = await locationController.getLocationById(id, false);

        const props_convert = JSON.parse(JSON.stringify(props));

        if(location === undefined || location?.id === undefined) {
            return null;
        }
        await locationController.location.update(
            props_convert,
            {
                where: {
                    id: location.id
                }
            });

        return await locationController.getLocationById(id, false);
    }
}