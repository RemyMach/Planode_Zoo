import {setUpUserTable} from './user';
import {JobFixture} from './job';

export async function setUpDatabase(): Promise<void> {

    const jobFixture = await JobFixture.getInstance();
    await jobFixture.setUpJobTable();
    await setUpUserTable();
}