import {UserFixture} from './user.fixture';
import {JobFixture} from './job.fixture';
import { RoleFixture } from './role.fixture';
import { SessionFixture } from './session.fixture';

export async function fillTables(): Promise<void> {

    const jobFixture = await JobFixture.getInstance();
    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();

    await jobFixture.fillTable();
    await roleFixture.fillTable();
    await userFixture.fillTable();
    await sessionFixture.fillTable();
}

export async function destroyTablesElement(): Promise<void> {

    const jobFixture = await JobFixture.getInstance();
    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    
    await sessionFixture.destroyFieldsTable();
    await userFixture.destroyFieldsTable();
    await jobFixture.destroyFieldsTable();
    await roleFixture.destroyFieldsTable();
}