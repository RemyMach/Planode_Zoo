import {setUpUserTable} from './user';

export async function setUpDatabase(): Promise<void> {

    await setUpUserTable();
}