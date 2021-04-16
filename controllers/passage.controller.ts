import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {PassageInstance} from "../models/passage.model";
import {PassageRepository} from "../repositories/passage.repository";
import {TicketInstance} from "../models/ticket.model";
import {AreaInstance} from "../models/area.model";

export class PassageController
{
    passage: ModelCtor<PassageInstance>;

    private static instance: PassageController;

    public static async getInstance(): Promise<PassageController> {
        if(PassageController.instance === undefined) {
            const { passage } = await SequelizeManager.getInstance();
            PassageController.instance = new PassageController(passage);
        }
        return PassageController.instance;
    }

    private constructor(passage: ModelCtor<PassageInstance>) {
        this.passage = passage;
    }

    public async getAllPassage(offset: number | undefined, limit: number | undefined): Promise<PassageInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await PassageRepository.getAllPassage(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async createPassage(date: Date, ticket: TicketInstance, area: AreaInstance): Promise<PassageInstance | null>
    {
        date = await PassageRepository.fixDateType(date);

        const passage = await this.passage.create({
            date,
            is_inside_the_area: true
        });
        passage.setTicket(ticket);
        passage.setArea(area);

        return passage;
    }

    public async updatePassage(id: number, date: Date, is_inside_the_area: boolean): Promise<PassageInstance | null> {
        return await PassageRepository.updatePassage(id, date, is_inside_the_area);
    }

    public async deletePassage(id: number): Promise<boolean> {
        return await PassageRepository.deletePassage(id);
    }
}
