import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {OrderInstance} from "../models/order.model";
import {OrderRepository} from "../repositories/order.repository";

export class OrderController
{
    order: ModelCtor<OrderInstance>;

    private static instance: OrderController;

    public static async getInstance(): Promise<OrderController> {
        if(OrderController.instance === undefined) {
            const { order } = await SequelizeManager.getInstance();
            OrderController.instance = new OrderController(order);
        }
        return OrderController.instance;
    }

    private constructor(order: ModelCtor<OrderInstance>) {
        this.order = order;
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

    public async createOrder(position: number): Promise<OrderInstance | null>
    {
        return await this.order.create({
            position
        });
    }

    public async updateOrder(id: number, position: number): Promise<OrderInstance | null> {
        return await OrderRepository.updateOrder(id, position);
    }

    public async deleteOrder(id: number): Promise<boolean> {
        return await OrderRepository.deleteOrder(id);
    }
}
