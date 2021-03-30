import { UserFixture } from './user.fixture';
import { JobFixture } from './job.fixture';
import { RoleFixture } from './role.fixture';
import { SessionFixture } from './session.fixture';
import { SpeciesFixture } from "./species.fixture";
import { RaceFixture } from "./race.fixture";
import {AnimalFixture} from "./animal.fixture";
import {HealthcareFixture} from "./healthcare.fixture";
import {AreaFixture} from "./area.fixture";
import {LocationFixture} from "./location.fixture";

export async function fillTables(): Promise<void> {

    const jobFixture = await JobFixture.getInstance();
    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();

    const speciesFixture = await SpeciesFixture.getInstance();
    const raceFixture = await RaceFixture.getInstance();
    const healthcareFixture = await HealthcareFixture.getInstance();
    const locationFixture = await LocationFixture.getInstance();
    const areaFixture = await AreaFixture.getInstance();
    const animalFixture = await AnimalFixture.getInstance();

    await jobFixture.fillTable();
    await roleFixture.fillTable();
    await userFixture.fillTable();
    await sessionFixture.fillTable();

    await speciesFixture.fillTable();
    await raceFixture.fillTable();
    await healthcareFixture.fillTable();
    await locationFixture.fillTable();
    await areaFixture.fillTable();
    await animalFixture.fillTable();
}

export async function destroyTablesElement(): Promise<void> {

    const jobFixture = await JobFixture.getInstance();
    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();

    const speciesFixture = await SpeciesFixture.getInstance();
    const raceFixture = await RaceFixture.getInstance();
    const healthcareFixture = await HealthcareFixture.getInstance();
    const locationFixture = await LocationFixture.getInstance();
    const areaFixture = await AreaFixture.getInstance();
    const animalFixture = await AnimalFixture.getInstance();
    
    await sessionFixture.destroyFieldsTable();
    await userFixture.destroyFieldsTable();
    await jobFixture.destroyFieldsTable();
    await roleFixture.destroyFieldsTable();

    await speciesFixture.destroyFieldsTable();
    await raceFixture.destroyFieldsTable();
    await healthcareFixture.destroyFieldsTable();
    await locationFixture.destroyFieldsTable();
    await areaFixture.destroyFieldsTable();
    await animalFixture.destroyFieldsTable();
}