import {ModelCtor, Op} from "sequelize";
import {SequelizeManager} from "../models";
import {PassageInstance} from "../models/passage.model";
import {PassageRepository} from "../repositories/passage.repository";
import {TicketInstance} from "../models/ticket.model";
import {AreaInstance} from "../models/area.model";
import {TicketController} from "./ticket.controller";
import {ConditionController} from "./condition.controller";

export class PassageController
{
    passage: ModelCtor<PassageInstance>;
    area: ModelCtor<AreaInstance>;
    ticket: ModelCtor<TicketInstance>;

    private static instance: PassageController;

    public static async getInstance(): Promise<PassageController> {
        if(PassageController.instance === undefined) {
            const { passage, area, ticket } = await SequelizeManager.getInstance();
            PassageController.instance = new PassageController(passage, area, ticket);
        }
        return PassageController.instance;
    }

    private constructor(passage: ModelCtor<PassageInstance>, area: ModelCtor<AreaInstance>, ticket: ModelCtor<TicketInstance>) {
        this.passage = passage;
        this.area = area;
        this.ticket = ticket;
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

    public async userEnter(ticket: TicketInstance, area: AreaInstance): Promise<PassageInstance | null>
    {
        const ticketController = await TicketController.getInstance();
        const conditionController = await ConditionController.getInstance();

        if(await ticketController.ticketIsExpired(ticket)){
            console.log("expired");
            return null;
        }

        if(await this.userIsAlreadyInsideAnArea(ticket)) {
            console.log("no");
            return null;
        }

        const areaStatus = await conditionController.getActualAreaStatus(area.id);
        if(areaStatus === null || areaStatus.label !== 'Open'){
            console.log("closed");
            return null;
        }

        if(!await ticketController.ticketHaveUsesLeft(ticket)){
            console.log("empty");
            return null;
        }

        if(!await ticketController.theAreaIsInTheGoodParcours(ticket, area)){
            console.log("wrong");
            return null;
        }

        return await this.createPassage(new Date, ticket, area);
    }

    public async userLeave(ticket: TicketInstance, area: AreaInstance): Promise<boolean>
    {
        const passages = await PassageRepository.getPassagesByTicketAndArea(ticket.id, area.id);
        if(passages === null)
        {
            return false;
        }
        for (let i = 0; i < passages.length; i++) {
            const json = JSON.parse(JSON.stringify(passages[i]));
            if(json.is_inside_the_area === 1)
            {
                await PassageRepository.updatePassage(json.id, json.date, false);
                return true;
            }
        }
        return false;
    }

    public async userIsAlreadyInsideAnArea(ticket: TicketInstance): Promise<boolean>
    {
        const passages = await PassageRepository.getPassagesByTicket(ticket.id);
        if(passages === null)
        {
            return false;
        }
        for (let i = 0; i < passages.length; i++) {
            const json = JSON.parse(JSON.stringify(passages[i]));
            if(json.is_inside_the_area === 1)
            {
                return true;
            }
        }
        return false;
    }

    async getNumberOfUseThisMonth(ticket: TicketInstance): Promise<number>
    {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        today.setDate(today.getDate() - 1);
        const passages = await this.passage.findAll({
            attributes: ['date'],
            group: ['date'],
            where: {
                date: {
                    [Op.lt]: today,
                    [Op.gt]: firstDay
                }
            },
            include: [{
                model: this.ticket,
                required: true,
                where: {
                    id: ticket.id
                }
            }]
        });

        return passages.length;
    }
}
