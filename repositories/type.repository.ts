import {TypeInstance, TypeUpdateProps} from "../models/type.model";
import {TypeController} from "../controllers/type.controller";

export class TypeRepository {

    public static async createType(props: TypeUpdateProps): Promise<TypeInstance | null> {
        const typeController = await TypeController.getInstance();
        return await typeController.type.create(props);
    }

    public static async getAllTypes(offset: number, limit: number): Promise<TypeInstance[]> {
        const typeController = await TypeController.getInstance();
        return await typeController.type.findAll({
            attributes: ['id', 'name'],
            offset,
            limit
        });
    }

    public static async getAllTypesDetails(offset: number, limit: number): Promise<TypeInstance[]> {
        const typeController = await TypeController.getInstance();
        return await typeController.type.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: typeController.area,
                attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access']
            }],
            offset,
            limit
        });
    }

    public static async getTypeById(id: number): Promise<TypeInstance | null> {
        const typeController = await TypeController.getInstance();

        return  await typeController.type.findOne({
            attributes: ['id', 'name'],
            where: {
                id
            }
        });
    }

    public static async getTypeDetailsById(id: number): Promise<TypeInstance | null> {
        const typeController = await TypeController.getInstance();

        return  await typeController.type.findOne({
            attributes: ['id', 'name'],
            include: [{
                model: typeController.area,
                attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access']
            }],
            where: {
                id
            }
        });
    }

    public static async getTypeByName(name: string): Promise<TypeInstance | null> {
        const typeController = await TypeController.getInstance();

        return  await typeController.type.findOne({
            attributes: ['id', 'name'],
            where: {
                name
            }
        });
    }

    public static async getTypeDetailsByName(name: string): Promise<TypeInstance | null> {
        const typeController = await TypeController.getInstance();

        return  await typeController.type.findOne({
            attributes: ['id', 'name'],
            include: [{
                model: typeController.area,
                attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access']
            }],
            where: {
                name
            }
        });
    }

    public static async updateType(id: number, props: TypeUpdateProps): Promise<TypeInstance | null> {
        const typeController = await TypeController.getInstance();
        const type = await typeController.getTypeById(id, false);

        const props_convert = JSON.parse(JSON.stringify(props));

        if(type === undefined || type?.id === undefined) {
            return null;
        }
        await typeController.type.update(
            props_convert,
            {
                where: {
                    id: type.id
                }
            });

        return await typeController.getTypeById(id, false);
    }

    public static async deleteType(id: number): Promise<boolean> {
        const typeController = await TypeController.getInstance();
        await typeController.type.destroy({
            where: {
                id
            }
        });

        const type = await typeController.getTypeById(id, false);
        return type === null;
    }
}