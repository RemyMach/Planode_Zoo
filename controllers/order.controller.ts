import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {OrderInstance} from "../models/order.model";
import {OrderRepository} from "../repositories/order.repository";
import {PassInstance} from "../models/pass.model";
import {AreaInstance} from "../models/area.model";
import {TicketInstance} from "../models/ticket.model";

export class OrderController
{
    order: ModelCtor<OrderInstance>;
    pass: ModelCtor<PassInstance>;
    area: ModelCtor<AreaInstance>;

    private static instance: OrderController;

    public static async getInstance(): Promise<OrderController> {
        if(OrderController.instance === undefined) {
            const { order, pass, area } = await SequelizeManager.getInstance();
            OrderController.instance = new OrderController(order, pass, area);
        }
        return OrderController.instance;
    }

    private constructor(order: ModelCtor<OrderInstance>, pass: ModelCtor<PassInstance>, area: ModelCtor<AreaInstance>) {
        this.order = order;
        this.pass = pass;
        this.area = area;
    }

    public async getAllOrder(offset: number | undefined, limit: number | undefined): Promise<OrderInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await OrderRepository.getAllOrder(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async createOrder(position: number, pass: PassInstance, area: AreaInstance): Promise<OrderInstance | null>
    {
        const order = await this.order.create({
            position
        });
        order.setPass(pass);
        order.setArea(area);

        return order;
    }

    public async updateOrder(id: number, position: number): Promise<OrderInstance | null> {
        return await OrderRepository.updateOrder(id, position);
    }

    public async deleteOrder(id: number): Promise<boolean> {
        return await OrderRepository.deleteOrder(id);
    }

    public async getTicketOrders(ticket: TicketInstance): Promise<OrderInstance[] | null> {
        return await OrderRepository.getTicketOrders(ticket);
    }
}

