import {NightOpeningInstance} from "../models/night_opening.model";
import {NightOpeningController} from "../controllers/night_opening.controller";

export class NightOpeningRepository
{
    public static async getAllNightOpenings(offset: number, limit: number): Promise<NightOpeningInstance[]>
    {
        const nightOpeningController = await NightOpeningController.getInstance();
        return await nightOpeningController.night_opening.findAll({
            attributes: ['id', 'new_closing_date'],
            offset,
            limit
        });
    }

    public static async getNightOpening(id: number): Promise<NightOpeningInstance | null>
    {
        const nightOpeningController = await NightOpeningController.getInstance();
        return await nightOpeningController.night_opening.findOne({
            attributes: ['id', 'new_closing_date'],
            where: {
                id
            }
        });
    }

    public static async searchNightOpeningByDate(date: Date): Promise<NightOpeningInstance | null>
    {
        const nightOpeningController = await NightOpeningController.getInstance();
        return await nightOpeningController.night_opening.findOne({
            where: {
                new_closing_date: date
            }
        });
    }

    public static async updateNightOpening(id: number, new_closing_date: Date): Promise<NightOpeningInstance | null> {

        const nightOpeningController = await NightOpeningController.getInstance();
        const nightOpening = await NightOpeningRepository.getNightOpening(id);

        if(nightOpening === undefined || nightOpening?.id === undefined) {
            return null;
        }

        const props_convert = JSON.parse(JSON.stringify({new_closing_date}));
        await nightOpeningController.night_opening.update(
            props_convert,
            {
                where: {
                    id: nightOpening.id
                }
            });

        return await NightOpeningRepository.getNightOpening(id);
    }

    public static async deleteNightOpening(id: number): Promise<boolean> {
        const nightOpeningController = await NightOpeningController.getInstance();
        await nightOpeningController.night_opening.destroy({
            where: {
                id: id
            }
        });

        const NightOpening = await NightOpeningRepository.getNightOpening(id);
        return NightOpening === null;
    }

    public static async fixDateType(date: Date): Promise<Date>
    {
        date.setUTCHours(0, 0, 0, 0);
        date.setDate((date.getDate() + 1));
        date.setMonth((date.getMonth() - 1));

        return date;
    }
}
