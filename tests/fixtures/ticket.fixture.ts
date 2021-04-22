import {fixture} from "./fixture";
import {TicketInstance} from "../../models/ticket.model";
import {SequelizeManager} from "../../models";
import {PassFixture} from "./pass.fixture";

export class TicketFixture implements fixture
{
    good_ticket?: TicketInstance;
    good_parcours_ticket?: TicketInstance;
    expired_ticket?: TicketInstance;
    already_inside_area_ticket?: TicketInstance;
    area_closed_ticket?: TicketInstance;
    wrong_area_ticket?: TicketInstance;
    no_use_left_ticket?: TicketInstance;

    good_night_ticket?: TicketInstance;
    zoo_closed_ticket?: TicketInstance;
    already_used_ticket?: TicketInstance;

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

        this.good_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.good_ticket.setPass(passFixture.year_pass);

        this.good_parcours_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.good_parcours_ticket.setPass(passFixture.escape_game_pass);

        this.expired_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2019, 3, 1)
        });
        this.expired_ticket.setPass(passFixture.day_pass);

        this.already_inside_area_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.already_inside_area_ticket.setPass(passFixture.year_pass);

        this.area_closed_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.area_closed_ticket.setPass(passFixture.year_pass);

        this.wrong_area_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.wrong_area_ticket.setPass(passFixture.no_area_pass);

        this.no_use_left_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.no_use_left_ticket.setPass(passFixture.one_day_per_month_pass);

        this.good_night_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.good_night_ticket.setPass(passFixture.night_pass);

        this.zoo_closed_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.zoo_closed_ticket.setPass(passFixture.night_pass);

        this.already_used_ticket = await manager.ticket.create({
            date_of_purchase: new Date(2021, 3, 1)
        });
        this.already_used_ticket.setPass(passFixture.night_pass);
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
