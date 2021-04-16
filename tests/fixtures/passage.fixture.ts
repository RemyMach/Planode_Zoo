import {fixture} from "./fixture";
import {PassageInstance} from "../../models/passage.model";
import {SequelizeManager} from "../../models";
import {AreaFixture} from "./area.fixture";
import {TicketFixture} from "./ticket.fixture";

export class PassageFixture implements fixture
{
    passage1_for_ticket1?: PassageInstance;
    passage2_for_ticket1?: PassageInstance;

    passage1_for_ticket2?: PassageInstance;

    private static instance: PassageFixture;

    public static async getInstance(): Promise<PassageFixture> {
        if(PassageFixture.instance === undefined) {
            PassageFixture.instance = new PassageFixture();
        }
        return PassageFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void>
    {
        const manager = await SequelizeManager.getInstance();
        const ticketFixture = await TicketFixture.getInstance();
        const areaFixture = await AreaFixture.getInstance();

        this.passage1_for_ticket1 = await manager.passage.create({
            date: new Date(2021, 2, 10),
            is_inside_the_area: false
        });
        this.passage1_for_ticket1.setTicket(ticketFixture.ticket1);
        this.passage1_for_ticket1.setArea(areaFixture.area_aviary);

        this.passage2_for_ticket1 = await manager.passage.create({
            date: new Date(2021, 2, 10),
            is_inside_the_area: true
        });
        this.passage2_for_ticket1.setTicket(ticketFixture.ticket1);
        this.passage2_for_ticket1.setArea(areaFixture.area_savanna);

        this.passage1_for_ticket2 = await manager.passage.create({
            date: new Date(2021, 3, 30),
            is_inside_the_area: true
        });
        this.passage1_for_ticket2.setTicket(ticketFixture.ticket2);
        this.passage1_for_ticket2.setArea(areaFixture.area_aviary);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.passage.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.passage.destroy({
            truncate: true,
            force: true
        });
    }
}
