import {PassageInstance} from "../models/passage.model";
import {PassageController} from "../controllers/passage.controller";
import {Op} from "sequelize";
import {WeekInstance} from "../models/week.model";

export class PassageRepository
{
    public static async getAllPassage(offset: number, limit: number): Promise<PassageInstance[]>
    {
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findAll({
            attributes: ['id', 'date', 'is_inside_the_area'],
            include: [{
                model: passageController.ticket,
                attributes: ['id', 'date_of_purchase']
            },{
                model: passageController.area,
                attributes: ['name']
            }],
            offset,
            limit
        });
    }

    public static async getPassage(id: number): Promise<PassageInstance | null>
    {
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findOne({
            attributes: ['id', 'date', 'is_inside_the_area'],
            include: [{
                model: passageController.ticket,
                attributes: ['id', 'date_of_purchase']
            },{
                model: passageController.area,
                attributes: ['name']
            }],
            where: {
                id
            }
        });
    }

    public static async getPassagesByTicketAndArea(ticket_id: number, area_id: number): Promise<PassageInstance[] | null>
    {
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findAll({
            attributes: ['id', 'date', 'is_inside_the_area'],
            include: [{
                model: passageController.ticket,
                required: true,
                where: {
                    id: ticket_id
                }
            },{
                model: passageController.area,
                required: true,
                where: {
                    id: area_id
                }
            }]
        });
    }

    public static async getPassagesByTicket(ticket_id: number): Promise<PassageInstance[] | null>
    {
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findAll({
            attributes: ['id', 'date', 'is_inside_the_area'],
            include: [{
                model: passageController.ticket,
                required: true,
                where: {
                    id: ticket_id
                }
            }]
        });
    }

    public static async getPassagesByTicketAndDate(ticket_id: number, date: Date): Promise<PassageInstance[] | null>
    {
        const passageController = await PassageController.getInstance();
        const date_start = new Date(date);
        date_start.setUTCHours(0, 0, 0, 0);
        return await passageController.passage.findAll({
            attributes: ['id'],
            where: {
                date : {
                    [Op.gt]: date_start,
                    [Op.lt]: date
                }
            },
            include: [{
                model: passageController.area,
                attributes: ['id'],
                required: true
            },{
                model: passageController.ticket,
                attributes: ['id'],
                required: true,
                where: {
                    id: ticket_id
                }
            }]
        });
    }

    public static async updatePassage(id: number, date: Date, is_inside_the_area: boolean): Promise<PassageInstance | null> {

        const passageController = await PassageController.getInstance();
        const passage = await PassageRepository.getPassage(id);

        if(passage === undefined || passage?.id === undefined) {
            return null;
        }

        date = date || passage.date;
        if(is_inside_the_area === undefined)
            is_inside_the_area = passage.is_inside_the_area;

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

    public static async getRealTimeStats(){
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findAll({
            attributes: ['id'],
            where: {
                is_inside_the_area : 1
            }
        });
    }

    public static async getRealTimeStatsByArea(area_id: number){
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findAll({
            attributes: ['id'],
            where: {
                is_inside_the_area : 1
            },
            include: [{
                model: passageController.area,
                attributes: ['id'],
                required: true,
                where: {
                    id: area_id
                }
            }]
        });
    }

    public static async getAreaStatsByDay(area_id: number, date: Date){
        const passageController = await PassageController.getInstance();
        const date_start = new Date(date);
        const date_end = new Date(date);
        date_start.setUTCHours(0, 0, 0, 0);
        date_end.setUTCHours(23, 59, 59, 999);
        return await passageController.passage.findAll({
            attributes: ['id'],
            where: {
                date : {
                    [Op.gt]: date_start,
                    [Op.lt]: date_end
                }
            },
            include: [{
                model: passageController.area,
                attributes: ['id'],
                required: true,
                where: {
                    id: area_id
                }
            }]
        });
    }

    public static async getStatsByDay(date: Date){
        const passageController = await PassageController.getInstance();
        const date_start = new Date(date);
        const date_end = new Date(date);
        date_start.setUTCHours(0, 0, 0, 0);
        date_end.setUTCHours(23, 59, 59, 999);
        return await passageController.passage.findAll({
            attributes: ['id'],
            where: {
                date : {
                    [Op.gt]: date_start,
                    [Op.lt]: date_end
                }
            }
        });
    }

    public static async getAreaStatsByWeek(area_id: number, week: WeekInstance){
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findAll({
            attributes: ['id'],
            where: {
                date : {
                    [Op.gt]: week.start_date,
                    [Op.lt]: week.end_date
                }
            },
            include: [{
                model: passageController.area,
                attributes: ['id'],
                required: true,
                where: {
                    id: area_id
                }
            }]
        });
    }

    public static async getStatsByWeek(week: WeekInstance){
        const passageController = await PassageController.getInstance();
        return await passageController.passage.findAll({
            attributes: ['id'],
            where: {
                date : {
                    [Op.gt]: week.start_date,
                    [Op.lt]: week.end_date
                }
            }
        });
    }

    public static async fixDateType(date: Date): Promise<Date>
    {
        date.setUTCHours(0, 0, 0, 0);
        date.setDate((date.getDate() + 1));
        date.setMonth((date.getMonth() - 1));

        return date;
    }
}
