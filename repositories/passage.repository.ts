import {PassageInstance} from "../models/passage.model";
import {PassageController} from "../controllers/passage.controller";

export class PassageRepository
{
    public static async getAllPassage(offset: number, limit: number): Promise<PassageInstance[]>
    {
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findAll({
            attributes: ['id', 'date', 'is_inside_the_area'],
            offset,
            limit
        });
    }

    public static async getPassage(id: number): Promise<PassageInstance | null>
    {
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findOne({
            where: {
                id
            }
        });
    }

    public static async updatePassage(id: number, date: Date, is_inside_the_area: boolean): Promise<PassageInstance | null> {

        const passageController = await PassageController.getInstance();
        const passage = await PassageRepository.getPassage(id);

        if(passage === undefined || passage?.id === undefined) {
            return null;
        }

        date = date || passage.date;
        is_inside_the_area = is_inside_the_area || passage.is_inside_the_area;

        const props_convert = JSON.parse(JSON.stringify({
            date,
            is_inside_the_area
        }));
        await passageController.passage.update(
            props_convert,
            {
                where: {
                    id: passage.id
                }
            });

        return await PassageRepository.getPassage(id);
    }

    public static async deletePassage(id: number): Promise<boolean> {
        const passageController = await PassageController.getInstance();
        await passageController.passage.destroy({
            where: {
                id: id
            }
        });

        const Passage = await PassageRepository.getPassage(id);
        return Passage === null;
    }

    public static async fixDateType(date: Date): Promise<Date>
    {
        date.setUTCHours(0, 0, 0, 0);
        date.setDate((date.getDate() + 1));
        date.setMonth((date.getMonth() - 1));

        return date;
    }
}
