import {fixture} from "./fixture";
import {PassageInstance} from "../../models/passage.model";
import {SequelizeManager} from "../../models";
import {AreaFixture} from "./area.fixture";
import {TicketFixture} from "./ticket.fixture";
import {PassageRepository} from "../../repositories/passage.repository";

export class PassageFixture implements fixture
{
    passage_for_already_inside_area_ticket?: PassageInstance;
    passage_for_no_use_left_ticket?: PassageInstance;
    passage_for_already_used_ticket?: PassageInstance;

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
        let date;

        date = await PassageRepository.fixDateType(new Date(2021, 2, 10));
        this.passage_for_already_inside_area_ticket = await manager.passage.create({
            date,
            is_inside_the_area: true
        });
        this.passage_for_already_inside_area_ticket.setTicket(ticketFixture.already_inside_area_ticket);
        this.passage_for_already_inside_area_ticket.setArea(areaFixture.area_aviary);

        date = await PassageRepository.fixDateType(new Date(2021, 4, 10));
        this.passage_for_no_use_left_ticket = await manager.passage.create({
            date,
            is_inside_the_area: false
        });
        this.passage_for_no_use_left_ticket.setTicket(ticketFixture.no_use_left_ticket);
        this.passage_for_no_use_left_ticket.setArea(areaFixture.area_aviary);
        date = await PassageRepository.fixDateType(new Date(2021, 5, 10));
        this.passage_for_no_use_left_ticket = await manager.passage.create({
            date,
            is_inside_the_area: false
        });
        this.passage_for_no_use_left_ticket.setTicket(ticketFixture.no_use_left_ticket);
        this.passage_for_no_use_left_ticket.setArea(areaFixture.area_aviary);

        date = await PassageRepository.fixDateType(new Date(2021, 4, 10));
        this.passage_for_already_used_ticket = await manager.passage.create({
            date,
            is_inside_the_area: false
        });
        this.passage_for_already_used_ticket.setTicket(ticketFixture.already_used_ticket);
        this.passage_for_already_used_ticket.setArea(areaFixture.area_aviary);
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
