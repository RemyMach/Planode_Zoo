import { UserFixture } from './user.fixture';
import { JobFixture } from './job.fixture';
import { RoleFixture } from './role.fixture';
import { SessionFixture } from './session.fixture';
import { SpeciesFixture } from "./species.fixture";
import { RaceFixture } from "./race.fixture";
import { AnimalFixture } from "./animal.fixture";
import { HealthcareFixture } from "./healthcare.fixture";
import { AreaFixture } from "./area.fixture";
import { LocationFixture } from "./location.fixture";
import { ConditionFixture } from "./condition.fixture";
import { StatusFixture } from "./status.fixture";
import { MaintainFixture } from './maintain.fixture';

export async function fillTables(): Promise<void> {

    const jobFixture = await JobFixture.getInstance();
    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    const maintainFixture = await MaintainFixture.getInstance();

    const speciesFixture = await SpeciesFixture.getInstance();
    const raceFixture = await RaceFixture.getInstance();
    const healthcareFixture = await HealthcareFixture.getInstance();
    const areaFixture = await AreaFixture.getInstance();
    const animalFixture = await AnimalFixture.getInstance();
    const locationFixture = await LocationFixture.getInstance();

    const conditionFixture = await ConditionFixture.getInstance();
    const statusFixture = await StatusFixture.getInstance();

    await jobFixture.fillTable();
    await roleFixture.fillTable();
    await userFixture.fillTable();
    await sessionFixture.fillTable();

    await speciesFixture.fillTable();
    await raceFixture.fillTable();
    await healthcareFixture.fillTable();
    await areaFixture.fillTable();

    await maintainFixture.fillTable();

    await animalFixture.fillTable();
    await locationFixture.fillTable();

    await statusFixture.fillTable();
    await conditionFixture.fillTable();
}

export async function destroyTablesElement(): Promise<void> {

    const jobFixture = await JobFixture.getInstance();
    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    const maintainFixture = await MaintainFixture.getInstance();

    const speciesFixture = await SpeciesFixture.getInstance();
    const raceFixture = await RaceFixture.getInstance();
    const healthcareFixture = await HealthcareFixture.getInstance();
    const areaFixture = await AreaFixture.getInstance();
    const animalFixture = await AnimalFixture.getInstance();
    const locationFixture = await LocationFixture.getInstance();

    const conditionFixture = await ConditionFixture.getInstance();
    const statusFixture = await StatusFixture.getInstance();
    
    await sessionFixture.destroyFieldsTable();
    await userFixture.destroyFieldsTable();
    await jobFixture.destroyFieldsTable();
    await roleFixture.destroyFieldsTable();

    await speciesFixture.destroyFieldsTable();
    await raceFixture.destroyFieldsTable();
    await healthcareFixture.destroyFieldsTable();

    await areaFixture.destroyFieldsTable();
    
    await maintainFixture.destroyFieldsTable();
    await animalFixture.destroyFieldsTable();
    await locationFixture.destroyFieldsTable();

    await statusFixture.destroyFieldsTable();
    await conditionFixture.destroyFieldsTable();
}
