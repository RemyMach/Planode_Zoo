import {fixture} from "./fixture";
import {OrderInstance} from "../../models/order.model";
import {SequelizeManager} from "../../models";
import {PassFixture} from "./pass.fixture";
import {AreaFixture} from "./area.fixture";

export class OrderFixture implements fixture
{
    order1?: OrderInstance;
    order2?: OrderInstance;

    private static instance: OrderFixture;

    public static async getInstance(): Promise<OrderFixture> {
        if(OrderFixture.instance === undefined) {
            OrderFixture.instance = new OrderFixture();
        }
        return OrderFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void>
    {
        const manager = await SequelizeManager.getInstance();
        const passFixture = await PassFixture.getInstance();
        const areaFixture = await AreaFixture.getInstance();

        this.order1 = await manager.order.create({
            position: 1
        });
        this.order1.setPass(passFixture.day_pass);
        this.order1.setArea(areaFixture.area_aviary);

        this.order2 = await manager.order.create({
            position: 2
        });
        this.order2.setPass(passFixture.day_pass);
        this.order2.setArea(areaFixture.area_savanna);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.order.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.order.destroy({
            truncate: true,
            force: true
        });
    }
}
