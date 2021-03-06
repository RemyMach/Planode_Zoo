import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {AreaInstance, AreaUpdateProps} from "../models/area.model";
import {LocationInstance} from "../models/location.model";
import {AreaRepository} from "../repositories/area.repository";
import {AnimalInstance} from "../models/animal.model";
import { MaintainInstance } from "../models/maintain.model";
import {ImageInstance} from "../models/image.model";
import {TypeInstance} from "../models/type.model";
import {ConditionController} from "./condition.controller";

export class AreaController {

    area: ModelCtor<AreaInstance>;
    location: ModelCtor<LocationInstance>;
    animal: ModelCtor<AnimalInstance>;
    maintain: ModelCtor<MaintainInstance>; 
    image: ModelCtor<ImageInstance>;
    type: ModelCtor<TypeInstance>;

    private static instance: AreaController;

    public static async getInstance(): Promise<AreaController> {
        if(AreaController.instance === undefined) {
            const { area, location, animal, maintain, image, type } = await SequelizeManager.getInstance();
            AreaController.instance = new AreaController(area, location, animal, maintain, image, type);
        }
        return AreaController.instance;
    }

    private constructor(area: ModelCtor<AreaInstance>, location: ModelCtor<LocationInstance>, animal: ModelCtor<AnimalInstance>, maintain: ModelCtor<MaintainInstance>, image: ModelCtor<ImageInstance>, type: ModelCtor<TypeInstance>) {
        this.area = area;
        this.location = location;
        this.animal = animal;
        this.maintain = maintain;
        this.image = image;
        this.type = type;
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

    public async getAllMaintains(id_area: number, start_date: string | null): Promise<AreaInstance[] | null> {

        const area: AreaInstance | null = await this.area.findByPk(id_area);
        if(area === null)
            return null;
        
        let start_date_formated: Date | null;
        if(start_date === null) {
            start_date_formated = new Date(70, 1, 1);
        }else {
            start_date_formated = this.convertStringDateInDateFormat(start_date);
        }

        if(start_date_formated ===  null)
            return null;
        
        return await AreaRepository.getAllMaintains(area, start_date_formated);
    }

    public async getAllAreaInMaintain(date: string | null): Promise<AreaInstance[] | null>{


        let date_formated: Date | null = null;
        if(date !== null)
            date_formated = this.convertStringDateInDateFormat(date);
        
        return await AreaRepository.getAllAreaInMaintain(date_formated);      
    }

    public async deleteArea(id: number): Promise<boolean> {
        return await AreaRepository.deleteArea(id);
    }

    public async areaIsOpen(area: AreaInstance): Promise<boolean> {
        const conditionController = await ConditionController.getInstance();
        const areaStatus = await conditionController.getActualAreaStatus(area.id);
        const actualTime = new Date().toLocaleTimeString();

        if(areaStatus === null || areaStatus.label !== 'Open'){
            return false;
        }

        return area.opening_time < actualTime && actualTime < area.closing_time;
    }

    private convertStringDateInDateFormat(date: string): Date | null {
        try{
            const new_date = new Date(date);
            new_date.setUTCHours(0, 0, 0, 0);
            new_date.setDate((new_date.getDate() + 1))
            return new_date;
        }catch {
            return null;
        }
    }
}
