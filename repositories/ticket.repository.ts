import {TicketInstance} from "../models/ticket.model";
import {TicketController} from "../controllers/ticket.controller";
import {PassInstance} from "../models/pass.model";

export class TicketRepository
{
    public static async getAllTicket(offset: number, limit: number): Promise<TicketInstance[]>
    {
        const ticketController = await TicketController.getInstance();
        return await ticketController.ticket.findAll({
            attributes: ['id', 'date_of_purchase'],
            include: [{
                model: ticketController.pass,
                attributes: ['number_of_days_of_validity', 'number_of_use_per_month']
            }],
            offset,
            limit
        });
    }

    public static async getTicket(id: number): Promise<TicketInstance | null>
    {
        const ticketController = await TicketController.getInstance();
        return await ticketController.ticket.findOne({
            attributes: ['id', 'date_of_purchase'],
            include: [{
                model: ticketController.pass,
                attributes: ['number_of_days_of_validity', 'number_of_use_per_month']
            }],
            where: {
                id
            }
        });
    }

    public static async searchTicketByPassAndDateOfPurchase(pass: PassInstance, date_of_purchase: Date): Promise<TicketInstance | null>
    {
        const ticketController = await TicketController.getInstance();
        date_of_purchase = await this.fixDateType(date_of_purchase);
        return await ticketController.ticket.findOne({
            where: {
                date_of_purchase
            }
        });
    }

    public static async updateTicket(id: number, date_of_purchase: Date): Promise<TicketInstance | null> {

        const ticketController = await TicketController.getInstance();
        const ticket = await TicketRepository.getTicket(id);

        if(ticket === undefined || ticket?.id === undefined) {
            return null;
        }

        date_of_purchase = await this.fixDateType(date_of_purchase);

        const props_convert = JSON.parse(JSON.stringify({date_of_purchase: date_of_purchase}));
        await ticketController.ticket.update(
            props_convert,
            {
                where: {
                    id: ticket.id
                }
            });

        return await TicketRepository.getTicket(id);
    }

    public static async deleteTicket(id: number): Promise<boolean> {
        const ticketController = await TicketController.getInstance();
        await ticketController.ticket.destroy({
            where: {
                id: id
            }
        });

        const Ticket = await TicketRepository.getTicket(id);
        return Ticket === null;
    }

    public static async fixDateType(date: Date): Promise<Date>
    {
        date.setUTCHours(0, 0, 0, 0);
        date.setDate((date.getDate() + 1));
        date.setMonth((date.getMonth() - 1));

        return date;
    }
}
