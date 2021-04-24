import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {NightOpeningInstance} from "../models/night_opening.model";
import {NightOpeningRepository} from "../repositories/night_opening.repository";

export class NightOpeningController
{
    night_opening: ModelCtor<NightOpeningInstance>;

    private static instance: NightOpeningController;

    public static async getInstance(): Promise<NightOpeningController> {
        if(NightOpeningController.instance === undefined) {
            const { night_opening } = await SequelizeManager.getInstance();
            NightOpeningController.instance = new NightOpeningController(night_opening);
        }
        return NightOpeningController.instance;
    }

    private constructor(night_opening: ModelCtor<NightOpeningInstance>) {
        this.night_opening = night_opening;
    }

    public async getAllNightOpening(offset: number | undefined, limit: number | undefined): Promise<NightOpeningInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await NightOpeningRepository.getAllNightOpenings(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async createNightOpening(new_closing_date: Date): Promise<NightOpeningInstance | null>
    {
        return await this.night_opening.create({
            new_closing_date
        });
    }

    public async updateNightOpening(id: number, new_closing_date: Date): Promise<NightOpeningInstance | null> {
        return await NightOpeningRepository.updateNightOpening(id, new_closing_date);
    }

    public async deleteNightOpening(id: number): Promise<boolean> {
        return await NightOpeningRepository.deleteNightOpening(id);
    }

    public async zooIsOpen(date: Date): Promise<boolean> {
        return await NightOpeningRepository.zooIsOpen(date);
    }
}

