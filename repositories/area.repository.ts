import { AreaController } from "../controllers/area.controller";
import { AreaInstance, AreaUpdateProps } from "../models/area.model";
import {Op} from 'sequelize';

export class AreaRepository {

    public static async getAllAreas(offset: number, limit: number): Promise<AreaInstance[]> {
        const areaController = await AreaController.getInstance();
        return await areaController.area.findAll({
            attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access'],
            include: [{
                model: areaController.location,
                attributes: ['entry_date', 'exit_date'],
                include: [{
                    model: areaController.animal,
                    attributes: ['id', 'name']
                }]
            }],
            offset,
            limit
        });

    }

    public static async getArea(id: number): Promise<AreaInstance | null> {
        const areaController = await AreaController.getInstance();

        return await areaController.area.findOne({
            attributes: ['id', 'name', 'description', 'surface'],
            include: [{
                model: areaController.location,
                attributes: ['entry_date', 'exit_date'],
                include: [{
                    model: areaController.animal,
                    attributes: ['id', 'name']
                }]
            }],
            where: {
                id
            }
        });
    }

    public static async updateArea(id: number, props: AreaUpdateProps): Promise<AreaInstance | null> {
        const areaController = await AreaController.getInstance();
        const area = await areaController.getArea(id);

        const props_convert = JSON.parse(JSON.stringify(props));

        if(area === undefined || area?.id === undefined) {
            return null;
        }
        await areaController.area.update(
            props_convert,
            {
                where: {
                    id: area.id
                }
            });

        return await areaController.getArea(id);
    }

    public static async getAllMaintains(area: AreaInstance, start_date: Date): Promise<AreaInstance[] | null> {
        const areaController = await AreaController.getInstance();
        return await areaController.area.findAll({
            attributes: {exclude: ['created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt']},
            where: {
                id: area.id
            },
            include: [{
                model: areaController.maintain,
                where: {
                    start_date: {
                        [Op.gte]: start_date
                    }
                }
            }]
        });

    }
}
