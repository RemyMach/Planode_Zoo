import { SequelizeManager } from "../../models";
import {sign, Secret} from 'jsonwebtoken';
import {JobFixture} from './job.fixture';
import { fixture } from "./fixture";
import {UserInstance} from "../../models/user.model";
import { RoleFixture } from "./role.fixture";
import { WeekRepository } from "../../repositories/week.repository";
import { WeekController } from "../../controllers/week.controller";

export class WeekFixture implements fixture{

    private static instance: WeekFixture;

    public static async getInstance(): Promise<WeekFixture> {
        if(WeekFixture.instance === undefined) {
            WeekFixture.instance = new WeekFixture();
        }
        return WeekFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const weekController = await WeekController.getInstance();
        await weekController.addAYearSinceTheLastWeekinTheDB();
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.week.destroy({
            truncate: true,
            force: true
        });
    }
}