import {SequelizeManager} from "../../models";
import {fixture} from "./fixture";
import {AreaInstance} from "../../models/area.model";
import {TypeFixture} from "./type.fixture";

export class AreaFixture implements fixture{

    area_savanna?: AreaInstance;
    area_aviary?: AreaInstance;

    private static instance: AreaFixture;

    public static async getInstance(): Promise<AreaFixture> {
        if(AreaFixture.instance === undefined) {
            AreaFixture.instance = new AreaFixture();
        }
        return AreaFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const typeFixture = await TypeFixture.getInstance();

        this.area_savanna = await manager.area.create({
            name: "savanna park",
            description: "discover africa's wildlife in his natural habitat",
            image: "https://thesafariworld.com/wp-content/uploads/2018/10/savana.jpg",
            surface: 90,
            best_month: 6,
            visitor_capacity: 25,
            visit_duration: 30,
            disabled_access: true,
            opening_time: "07:00:00",
            closing_time: "19:00:00"
        });
        this.area_savanna.setType(typeFixture.type_park);

        this.area_aviary = await manager.area.create({
            name: "the golden cage",
            description: "meet the world most beautiful eagle, the golden eagle",
            image: "https://cdn.unitycms.io/image/ocroped/1200,1200,1000,1000,0,0/OzJRL7sZFak/D9p0F8EoaZj9x5aViGxuKl.jpg",
            surface: 60,
            best_month: 3,
            visitor_capacity: 15,
            visit_duration: 15,
            disabled_access: true,
            opening_time: "10:00:00",
            closing_time: "19:30:00"
        });
        this.area_aviary.setType(typeFixture.type_aviary);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.animal.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.animal.destroy({
            truncate: true,
            force: true
        });
    }
}