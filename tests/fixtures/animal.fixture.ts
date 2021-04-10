import {SequelizeManager} from "../../models";
import {fixture} from "./fixture";
import {AnimalInstance} from "../../models/animal.model";
import {RaceFixture} from "./race.fixture";
import {HealthcareFixture} from "./healthcare.fixture";

export class AnimalFixture implements fixture{

    animal_windows_is_better?: AnimalInstance;
    animal_java?: AnimalInstance;
    animal_dwight?: AnimalInstance;
    animal_wilhelm?: AnimalInstance

    private static instance: AnimalFixture;

    public static async getInstance(): Promise<AnimalFixture> {
        if(AnimalFixture.instance === undefined) {
            AnimalFixture.instance = new AnimalFixture();
        }
        return AnimalFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const raceFixture = await RaceFixture.getInstance();
        const healthcareFixture = await HealthcareFixture.getInstance();

        this.animal_windows_is_better = await manager.animal.create({
            name: "Windows is better than mac",
            birthdate: new Date(1991, 1, 19),
            height: 5,
            weight: 800
        });
        await this.animal_windows_is_better.setRace(raceFixture.race_python);
        await this.animal_windows_is_better.addHealthcare(healthcareFixture.healthcare_wound);

        this.animal_java = await manager.animal.create({
            name: "JAVA",
            birthdate: new Date(1995, 5, 22),
            height: 60,
            weight: 12600
        });
        await this.animal_java?.setRace(raceFixture.race_serval);

        this.animal_dwight = await manager.animal.create({
            name: "Dwight D. EISENHOWER",
            birthdate: new Date(2002, 2, 2),
            height: 85,
            weight: 20900
        });
        await this.animal_dwight.setRace(raceFixture.race_ocelot);
        await this.animal_dwight.addHealthcare(healthcareFixture.healthcare_diarrhea);

        this.animal_wilhelm = await manager.animal.create({
            name: "Wilhelm Hansen",
            birthdate: new Date(2015, 5, 10),
            height: 50,
            weight: 8300
        });
        await this.animal_wilhelm.setRace(raceFixture.race_golden_eagle);
        await this.animal_wilhelm.addHealthcare(healthcareFixture.healthcare_spanish_flu);
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