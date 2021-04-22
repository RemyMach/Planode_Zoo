import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {TicketInstance} from "../models/ticket.model";
import {TicketRepository} from "../repositories/ticket.repository";
import {PassInstance} from "../models/pass.model";
import {PassageController} from "./passage.controller";
import {AreaInstance} from "../models/area.model";
import {OrderController} from "./order.controller";
import {PassageRepository} from "../repositories/passage.repository";

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

    public async ticketIsExpired(ticket: TicketInstance): Promise<boolean> {
        const todayDate = new Date();
        todayDate.setHours(todayDate.getHours() + 2)

        const json = JSON.parse(JSON.stringify(ticket));
        const expiredDate = new Date(json.date_of_purchase);
        expiredDate.setDate(expiredDate.getDate() + json.Pass.number_of_days_of_validity);

        return expiredDate <= todayDate;
    }

    public async ticketHaveUsesLeft(ticket: TicketInstance): Promise<boolean> {
        const passageController = await PassageController.getInstance();
        const json = JSON.parse(JSON.stringify(ticket));
        if(json.Pass.number_of_use_per_month !== -1)
        {
            return await passageController.getNumberOfUsesThisMonth(ticket) < json.Pass.number_of_use_per_month;
        }
        return true;
    }

    public async theAreaIsInTheGoodParcours(ticket: TicketInstance, area: AreaInstance): Promise<boolean>
    {
        const orderController = await OrderController.getInstance();
        const orders = JSON.parse(JSON.stringify(await orderController.getTicketOrders(ticket)));
        let area_id_authorized;
        let position = 0;

        if(orders.length === 0){
            return false;
        }

        if(orders[0].position === -1){
            for (let i = 0; i < orders.length; i++){
                if(orders[i].Area.id === area.id){
                    return true;
                }
            }
            console.log("not in the pool");
            return false;
        }

        const passagesOfTheDay = await PassageRepository.getPassagesByTicketAndDate(ticket.id, new Date());

        if(passagesOfTheDay !== null) {
            position = passagesOfTheDay.length;
        }

        for(let i = 0; i < orders.length; i++){
            console.log(orders[i].position);
            console.log(position + 1);
            if(orders[i].position === position + 1){
                area_id_authorized = orders[i].Area.id;
            }
        }

        if(area_id_authorized === undefined){
            console.log("undefined");
            return false;
        }

        if(area_id_authorized !== area.id) {
            console.log("different");
            return false;
        }

        return true;
    }
}
