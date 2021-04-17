import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {TicketInstance} from "../models/ticket.model";
import {TicketRepository} from "../repositories/ticket.repository";
import {PassInstance} from "../models/pass.model";

export class TicketController
{
    ticket: ModelCtor<TicketInstance>;
    pass: ModelCtor<PassInstance>;

    private static instance: TicketController;

    public static async getInstance(): Promise<TicketController> {
        if(TicketController.instance === undefined) {
            const { ticket, pass } = await SequelizeManager.getInstance();
            TicketController.instance = new TicketController(ticket, pass);
        }
        return TicketController.instance;
    }

    private constructor(Ticket: ModelCtor<TicketInstance>, Pass: ModelCtor<PassInstance>) {
        this.ticket = Ticket;
        this.pass = Pass;
    }

    public async getAllTicket(offset: number | undefined, limit: number | undefined): Promise<TicketInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await TicketRepository.getAllTicket(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async createTicket(date_of_purchase: Date, pass: PassInstance): Promise<TicketInstance | null>
    {
        date_of_purchase = await TicketRepository.fixDateType(date_of_purchase);

        const ticket = await this.ticket.create({
            date_of_purchase
        });
        ticket.setPass(pass);

        return ticket;
    }

    public async updateTicket(id: number, date_of_purchase: Date): Promise<TicketInstance | null> {
        return await TicketRepository.updateTicket(id, date_of_purchase);
    }

    public async deleteTicket(id: number): Promise<boolean> {
        return await TicketRepository.deleteTicket(id);
    }
}
