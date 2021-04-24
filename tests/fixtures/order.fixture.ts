import {fixture} from "./fixture";
import {OrderInstance} from "../../models/order.model";
import {SequelizeManager} from "../../models";
import {PassFixture} from "./pass.fixture";
import {AreaFixture} from "./area.fixture";

export class OrderFixture implements fixture
{
    order_1_for_escape_game_pass?: OrderInstance;
    order_2_for_escape_game_pass?: OrderInstance;

    order_1_for_year_pass?: OrderInstance;
    order_2_for_year_pass?: OrderInstance;

    order_1_for_one_day_per_month_pass?: OrderInstance;
    order_2_for_one_day_per_month_pass?: OrderInstance;

    order_1_for_night_pass?: OrderInstance;
    order_2_for_night_pass?: OrderInstance;

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

        this.order_1_for_escape_game_pass = await manager.order.create({
            position: 1
        });
        this.order_1_for_escape_game_pass.setPass(passFixture.escape_game_pass);
        this.order_1_for_escape_game_pass.setArea(areaFixture.area_aviary);

        this.order_2_for_escape_game_pass = await manager.order.create({
            position: 2
        });
        this.order_2_for_escape_game_pass.setPass(passFixture.escape_game_pass);
        this.order_2_for_escape_game_pass.setArea(areaFixture.area_savanna);


        this.order_1_for_year_pass = await manager.order.create({
            position: -1
        });
        this.order_1_for_year_pass.setPass(passFixture.year_pass);
        this.order_1_for_year_pass.setArea(areaFixture.area_aviary);

        this.order_2_for_year_pass = await manager.order.create({
            position: -1
        });
        this.order_2_for_year_pass.setPass(passFixture.year_pass);
        this.order_2_for_year_pass.setArea(areaFixture.area_savanna);


        this.order_1_for_one_day_per_month_pass = await manager.order.create({
            position: -1
        });
        this.order_1_for_one_day_per_month_pass.setPass(passFixture.one_day_per_month_pass);
        this.order_1_for_one_day_per_month_pass.setArea(areaFixture.area_aviary);

        this.order_2_for_one_day_per_month_pass = await manager.order.create({
            position: -1
        });
        this.order_2_for_one_day_per_month_pass.setPass(passFixture.one_day_per_month_pass);
        this.order_2_for_one_day_per_month_pass.setArea(areaFixture.area_savanna);


        this.order_1_for_night_pass = await manager.order.create({
            position: -1
        });
        this.order_1_for_night_pass.setPass(passFixture.night_pass);
        this.order_1_for_night_pass.setArea(areaFixture.area_aviary);

        this.order_2_for_night_pass = await manager.order.create({
            position: -1
        });
        this.order_2_for_night_pass.setPass(passFixture.night_pass);
        this.order_2_for_night_pass.setArea(areaFixture.area_savanna);
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
