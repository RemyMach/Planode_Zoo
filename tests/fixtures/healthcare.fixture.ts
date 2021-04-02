import { SequelizeManager } from "../../models";
import { fixture } from "./fixture";
import { HealthcareInstance } from "../../models/healthcare.model";

export class HealthcareFixture implements fixture{

    healthcare_spanish_flu?: HealthcareInstance;
    healthcare_diarrhea?: HealthcareInstance;
    healthcare_wound?: HealthcareInstance;

    private static instance: HealthcareFixture;

    public static async getInstance(): Promise<HealthcareFixture> {
        if(HealthcareFixture.instance === undefined) {
            HealthcareFixture.instance = new HealthcareFixture();
        }
        return HealthcareFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();

        this.healthcare_spanish_flu = await manager.healthcare.create({
            date: new Date(2021, 0, 14),
            name: "treatment for the spanish flu",
            notes: "the animal seems better however he grew a mustache",
            cost: 459.99,
            success: true
        });

        this.healthcare_diarrhea = await manager.healthcare.create({
            date: new Date(2021, 1, 2),
            name: "treatment for diarrhea",
            notes: "the origin of the diarrhea is yet to define, all animals must be watched carrefully",
            cost: 79.99,
            success: true
        });

        this.healthcare_wound = await manager.healthcare.create({
            date: new Date(2021, 1, 26),
            name: "minor wounds",
            notes: "the animal failed to run",
            cost: 9.99,
            success: true
        });
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