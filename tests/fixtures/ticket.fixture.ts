import {fixture} from "./fixture";
import {TicketInstance} from "../../models/ticket.model";
import {SequelizeManager} from "../../models";
import {PassFixture} from "./pass.fixture";

export class TicketFixture implements fixture
{
    ticket1?: TicketInstance;
    ticket2?: TicketInstance;
    ticket3?: TicketInstance;
    ticket4?: TicketInstance;

    private static instance: TicketFixture;

    public static async getInstance(): Promise<TicketFixture> {
        if(TicketFixture.instance === undefined) {
            TicketFixture.instance = new TicketFixture();
        }
        return TicketFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void>
    {
        const manager = await SequelizeManager.getInstance();
        const passFixture = await PassFixture.getInstance();

        this.ticket1 = await manager.ticket.create({
            date_of_purchase: new Date(2021, 1, 1)
        });
        this.ticket1.setPass(passFixture.day_pass);

        this.ticket2 = await manager.ticket.create({
            date_of_purchase: new Date(2021, 2, 15)
        });
        this.ticket2.setPass(passFixture.week_pass);

        this.ticket3 = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 21)
        });
        this.ticket3.setPass(passFixture.one_day_per_month_pass);

        this.ticket4 = await manager.ticket.create({
            date_of_purchase: new Date(2020, 5, 11)
        });
        this.ticket4.setPass(passFixture.night_pass);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.ticket.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.ticket.destroy({
            truncate: true,
            force: true
        });
    }
}
