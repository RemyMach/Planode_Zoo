import { ModelCtor } from "sequelize";
import { SequelizeManager } from "../models";
import { AreaInstance, AreaUpdateProps } from "../models/area.model";
import { LocationInstance } from "../models/location.model";
import { AreaRepository } from "../repositories/area.repository";

export class AreaController {

    area: ModelCtor<AreaInstance>;
    location: ModelCtor<LocationInstance>;

    private static instance: AreaController;

    public static async getInstance(): Promise<AreaController> {
        if(AreaController.instance === undefined) {
            const { area, location } = await SequelizeManager.getInstance();
            AreaController.instance = new AreaController(area, location);
        }
        return AreaController.instance;
    }

    private constructor(area: ModelCtor<AreaInstance>, location: ModelCtor<LocationInstance>) {
        this.area = area;
        this.location = location;
    }

    public async getAll(offset: number | undefined, limit: number | undefined): Promise<AreaInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await AreaRepository.getAllAreas(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getArea(id: number): Promise<AreaInstance | null> {
        const area = await AreaRepository.getArea(id);

        if(area !== null) {
            return area;
        }

        return null;
    }

    public async updateArea(id: number, props: AreaUpdateProps): Promise<AreaInstance | null> {
        return await AreaRepository.updateArea(id, props);
    }
}