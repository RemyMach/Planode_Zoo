import { ModelCtor } from "sequelize";
import { SequelizeManager } from "../models";
import { LocationInstance, LocationUpdateProps } from "../models/location.model";
import { AnimalInstance } from "../models/animal.model";
import { AreaInstance } from "../models/area.model";
import { LocationRepository } from "../repositories/location.repository";

export class LocationController {

    animal: ModelCtor<AnimalInstance>;
    location: ModelCtor<LocationInstance>;
    area: ModelCtor<AreaInstance>;

    private static instance: LocationController;

    public static async getInstance(): Promise<LocationController> {
        if(LocationController.instance === undefined) {
            const { animal, location, area } = await SequelizeManager.getInstance();
            LocationController.instance = new LocationController(animal, location, area);
        }
        return LocationController.instance;
    }

    private constructor(animal: ModelCtor<AnimalInstance>, location: ModelCtor<LocationInstance>, area: ModelCtor<AreaInstance>) {
        this.animal = animal;
        this.location = location;
        this.area = area;
    }

    public async getAll(offset: number | undefined, limit: number | undefined, details: boolean): Promise<LocationInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        let res: LocationInstance[];
        if (details) {
            res = await LocationRepository.getAllLocationsDetails(offset, limit);
        } else {
            res = await LocationRepository.getAllLocations(offset, limit);
        }

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getLocationById(id: number, details: boolean): Promise<LocationInstance | null> {
        let location: LocationInstance | null;
        if (details) {
            location = await LocationRepository.getLocationDetailsById(id);
        } else {
            location = await LocationRepository.getLocationById(id);
        }

        if(location !== null) {
            return location;
        }

        return null;
    }

    public async updateLocation(id: number, props: LocationUpdateProps): Promise<LocationInstance | null> {
        return await LocationRepository.updateLocation(id, props);
    }
}