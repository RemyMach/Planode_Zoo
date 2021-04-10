import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {AreaInstance, AreaUpdateProps} from "../models/area.model";
import {LocationInstance} from "../models/location.model";
import {AreaRepository} from "../repositories/area.repository";
import {AnimalInstance} from "../models/animal.model";

export class AreaController {

    area: ModelCtor<AreaInstance>;
    location: ModelCtor<LocationInstance>;
    animal: ModelCtor<AnimalInstance>;

    private static instance: AreaController;

    public static async getInstance(): Promise<AreaController> {
        if(AreaController.instance === undefined) {
            const { area, location, animal } = await SequelizeManager.getInstance();
            AreaController.instance = new AreaController(area, location, animal);
        }
        return AreaController.instance;
    }

    private constructor(area: ModelCtor<AreaInstance>, location: ModelCtor<LocationInstance>, animal: ModelCtor<AnimalInstance>) {
        this.area = area;
        this.location = location;
        this.animal = animal;
    }

    public async createArea(props: AreaUpdateProps): Promise<AreaInstance | null> {
        return await AreaRepository.createArea(props);
    }

    public async getAll(offset: number | undefined, limit: number | undefined, details: boolean): Promise<AreaInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        let res: AreaInstance[];
        if (details) {
            res = await AreaRepository.getAllAreaDetails(offset, limit);
        } else {
            res = await AreaRepository.getAllAreas(offset, limit);
        }

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getArea(id: number, details: boolean): Promise<AreaInstance | null> {
        let area: AreaInstance | null;
        if (details) {
            area = await AreaRepository.getAreaDetails(id);
        } else {
            area = await AreaRepository.getArea(id);
        }

        if(area !== null) {
            return area;
        }

        return null;
    }

    public async updateArea(id: number, props: AreaUpdateProps): Promise<AreaInstance | null> {
        return await AreaRepository.updateArea(id, props);
    }

    public async deleteArea(id: number): Promise<boolean> {
        return await AreaRepository.deleteArea(id);
    }
}