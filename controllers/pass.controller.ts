import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {PassInstance} from "../models/pass.model";
import {PassRepository} from "../repositories/pass.repository";

export class PassController
{
    pass: ModelCtor<PassInstance>;

    private static instance: PassController;

    public static async getInstance(): Promise<PassController> {
        if(PassController.instance === undefined) {
            const { pass } = await SequelizeManager.getInstance();
            PassController.instance = new PassController(pass);
        }
        return PassController.instance;
    }

    private constructor(pass: ModelCtor<PassInstance>) {
        this.pass = pass;
    }

    public async getAllPass(offset: number | undefined, limit: number | undefined): Promise<PassInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await PassRepository.getAllPass(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async createPass(number_of_days_of_validity: number, number_of_use_per_month: number, is_night_pass: boolean): Promise<PassInstance | null>
    {
        await this.pass.create({
            number_of_days_of_validity,
            number_of_use_per_month,
            is_night_pass
        });

        return PassRepository.getPassByParams(number_of_days_of_validity, number_of_use_per_month);
    }

    public async updatePass(id: number, number_of_days_of_validity: number, number_of_use_per_month: number): Promise<PassInstance | null> {
        return await PassRepository.updatePass(id, number_of_days_of_validity, number_of_use_per_month);
    }

    public async deletePass(id: number): Promise<boolean> {
        return await PassRepository.deletePass(id);
    }
}
