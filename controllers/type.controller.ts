import {ModelCtor} from "sequelize";
import {TypeInstance, TypeUpdateProps} from "../models/type.model";
import {SequelizeManager} from "../models";
import {TypeRepository} from "../repositories/type.repository";
import {AreaInstance} from "../models/area.model";

export class TypeController {

    type: ModelCtor<TypeInstance>;
    area: ModelCtor<AreaInstance>;

    private static instance: TypeController;

    public static async getInstance() {
        if(TypeController.instance === undefined) {
            const { type, area } = await SequelizeManager.getInstance();
            TypeController.instance = new TypeController(type, area);
        }
        return TypeController.instance;
    }

    private constructor(type: ModelCtor<TypeInstance>, area: ModelCtor<AreaInstance>) {
        this.type = type;
        this.area = area;
    }

    public async createType(props: TypeUpdateProps): Promise<TypeInstance | null> {
        return await TypeRepository.createType(props);
    }

    public async getAll(offset: number | undefined, limit: number | undefined, details: boolean): Promise<TypeInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        let res: TypeInstance[];
        if (details) {
            res = await TypeRepository.getAllTypesDetails(offset, limit);
        } else {
            res = await TypeRepository.getAllTypes(offset, limit);
        }

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getTypeById(id: number, details: boolean): Promise<TypeInstance | null> {
        let type: TypeInstance | null;
        if (details) {
            type = await TypeRepository.getTypeDetailsById(id);
        } else {
            type = await TypeRepository.getTypeById(id);
        }

        if(type !== null) {
            return type;
        }

        return null;
    }

    public async getTypeByName(name: string, details: boolean): Promise<TypeInstance | null> {
        let type: TypeInstance | null;
        if (details) {
            type = await TypeRepository.getTypeDetailsByName(name);
        } else {
            type = await TypeRepository.getTypeByName(name);
        }

        if(type !== null) {
            return type;
        }

        return null;
    }

    public async updateType(id: number, props: TypeUpdateProps): Promise<TypeInstance | null> {
        return await TypeRepository.updateType(id, props);
    }

    public async deleteType(id: number): Promise<boolean> {
        return await TypeRepository.deleteType(id);
    }
}