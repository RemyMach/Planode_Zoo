import {UserFixture} from './user.fixture';
import {JobFixture} from './job.fixture';
import { RoleFixture } from './role.fixture';
import { SessionFixture } from './session.fixture';

export async function setUpDatabase(): Promise<void> {

    const jobFixture = await JobFixture.getInstance();
    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();

    await jobFixture.setUpTable();
    await roleFixture.setUpTable();
    await userFixture.setUpTable();
    await sessionFixture.setUpTable();
}