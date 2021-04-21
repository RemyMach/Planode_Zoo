import {NightOpeningInstance} from "../models/night_opening.model";
import {NightOpeningController} from "../controllers/night_opening.controller";
import {Op} from "sequelize";

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

    static async zooIsOpen(date: Date) {
        const nightOpeningController = await NightOpeningController.getInstance();
        const max_time = await NightOpeningRepository.getMaxNightTime(date);

        const night_openings = await nightOpeningController.night_opening.findAll({
            attributes: ['new_closing_date'],
            where: {
                new_closing_date: {
                    [Op.gt]: date,
                    [Op.lt]: max_time
                }
            }
        });

        return night_openings.length > 0;
    }

    public static async getMaxNightTime(actual_date_time: Date): Promise<Date>
    {
        const date = new Date(actual_date_time);
        date.setUTCHours(8, 0, 0);
        if(actual_date_time.getHours() > 8){
            date.setDate(date.getDate() + 1);
        }
        return date;
    }
}
