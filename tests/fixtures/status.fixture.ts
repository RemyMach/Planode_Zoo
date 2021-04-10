import {SequelizeManager} from "../../models";
import {fixture} from "./fixture";
import {StatusInstance} from "../../models/status.model";

export class StatusFixture implements fixture {

    private static instance: StatusFixture;
    status_open?: StatusInstance;
    status_in_maintenance?: StatusInstance;

    private constructor() {
    };

    public static async getInstance(): Promise<StatusFixture> {
        if (StatusFixture.instance === undefined) {
            StatusFixture.instance = new StatusFixture();
        }
        return StatusFixture.instance;
    }

    public async fillTable(): Promise<void>
    {
        const manager = await SequelizeManager.getInstance();

        this.status_open = await manager.status.create({
            label: "Open"
        });
        this.status_in_maintenance = await manager.status.create({
            label: "In maintenance"
        });
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.status.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.status.destroy({
            truncate: true,
            force: true
        });
    }
}
