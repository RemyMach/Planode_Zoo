import { AreaController } from "../controllers/area.controller";
import { AreaInstance, AreaUpdateProps } from "../models/area.model";

export class AreaRepository {

    public static async getAllAreas(offset: number, limit: number): Promise<AreaInstance[]> {
        const areaController = await AreaController.getInstance();
        return await areaController.area.findAll({
            attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access'],
            include: [{
                model: areaController.location,
                attributes: ['entry_date', 'exit_date', 'animal_id']
            }],
            offset,
            limit
        });

    }

    public static async getArea(id: number): Promise<AreaInstance | null> {
        const areaController = await AreaController.getInstance();

        return  await areaController.area.findOne({
            attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access'],
            include: [{
                model: areaController.location,
                attributes: ['entry_date', 'exit_date', 'animal_id']
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
}