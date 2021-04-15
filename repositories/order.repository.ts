import {OrderInstance} from "../models/order.model";
import {OrderController} from "../controllers/order.controller";

export class OrderRepository
{
    public static async getAllOrder(offset: number, limit: number): Promise<OrderInstance[]>
    {
        const orderController = await OrderController.getInstance();
        return await orderController.order.findAll({
            attributes: ['id', 'position'],
            offset,
            limit
        });
    }

    public static async getOrder(id: number): Promise<OrderInstance | null>
    {
        const orderController = await OrderController.getInstance();
        return await orderController.order.findOne({
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
}
