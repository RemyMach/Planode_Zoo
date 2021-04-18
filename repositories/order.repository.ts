import {OrderInstance} from "../models/order.model";
import {OrderController} from "../controllers/order.controller";
import {TicketInstance} from "../models/ticket.model";

export class OrderRepository
{
    public static async getAllOrder(offset: number, limit: number): Promise<OrderInstance[]>
    {
        const orderController = await OrderController.getInstance();
        return await orderController.order.findAll({
            attributes: ['id', 'position'],
            include: [{
                model: orderController.pass,
                attributes: ['number_of_days_of_validity', 'number_of_use_per_month']
            },{
                model: orderController.area,
                attributes: ['name']
            }],
            offset,
            limit
        });
    }

    public static async getOrder(id: number): Promise<OrderInstance | null>
    {
        const orderController = await OrderController.getInstance();
        return await orderController.order.findOne({
            attributes: ['id', 'position'],
            include: [{
                model: orderController.pass,
                attributes: ['number_of_days_of_validity', 'number_of_use_per_month']
            },{
                model: orderController.area,
                attributes: ['name']
            }],
            where: {
                id
            }
        });
    }

    public static async searchOrderByPosition(position: number): Promise<OrderInstance | null>
    {
        const orderController = await OrderController.getInstance();
        return await orderController.order.findOne({
            where: {
                position
            }
        });
    }

    public static async updateOrder(id: number, position: number): Promise<OrderInstance | null> {

        const orderController = await OrderController.getInstance();
        const order = await OrderRepository.getOrder(id);

        if(order === undefined || order?.id === undefined) {
            return null;
        }

        const props_convert = JSON.parse(JSON.stringify({position}));
        await orderController.order.update(
            props_convert,
            {
                where: {
                    id: order.id
                }
            });

        return await OrderRepository.getOrder(id);
    }

    public static async deleteOrder(id: number): Promise<boolean> {
        const orderController = await OrderController.getInstance();
        await orderController.order.destroy({
            where: {
                id: id
            }
        });

        const Order = await OrderRepository.getOrder(id);
        return Order === null;
    }

    static async getTicketOrders(ticket: TicketInstance): Promise<OrderInstance[] | null>
    {
        const orderController = await OrderController.getInstance();
        const json = JSON.parse(JSON.stringify(ticket));
        return await orderController.order.findAll({
            attributes: ['id', 'position'],
            include: [{
                model: orderController.pass,
                attributes: ['id'],
                required: true,
                where: {
                    id: json.Pass.id
                }
            },{
                model: orderController.area,
                attributes: ['id']
            }]
        });
    }
}
