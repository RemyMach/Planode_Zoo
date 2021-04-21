import {PassInstance} from "../models/pass.model";
import {PassController} from "../controllers/pass.controller";

export class PassRepository
{
    public static async getAllPass(offset: number, limit: number): Promise<PassInstance[]>
    {
        const passController = await PassController.getInstance();
        return await passController.pass.findAll({
            attributes: ['id', 'number_of_days_of_validity', 'number_of_use_per_month', 'is_night_pass'],
            offset,
            limit
        });
    }

    public static async getPass(id: number): Promise<PassInstance | null>
    {
        const passController = await PassController.getInstance();
        return await passController.pass.findOne({
            attributes: ['id', 'number_of_days_of_validity', 'number_of_use_per_month', 'is_night_pass'],
            where: {
                id
            }
        });
    }

    public static async getPassByParams(number_of_days_of_validity: number, number_of_use_per_month: number): Promise<PassInstance | null>
    {
        const passController = await PassController.getInstance();
        return await passController.pass.findOne({
            attributes: ['id', 'number_of_days_of_validity', 'number_of_use_per_month', 'is_night_pass'],
            where: {
                number_of_days_of_validity,
                number_of_use_per_month
            }
        });
    }

    public static async updatePass(id: number, number_of_days_of_validity: number, number_of_use_per_month: number): Promise<PassInstance | null> {

        const passController = await PassController.getInstance();
        const pass = await PassRepository.getPass(id);

        if(pass === undefined || pass?.id === undefined) {
            return null;
        }

        number_of_days_of_validity = number_of_days_of_validity || pass.number_of_days_of_validity;
        number_of_use_per_month = number_of_use_per_month || pass.number_of_use_per_month;

        const props_convert = JSON.parse(JSON.stringify({
            number_of_days_of_validity,
            number_of_use_per_month
        }));
        await passController.pass.update(
            props_convert,
            {
                where: {
                    id: pass.id
                }
            });

        return await PassRepository.getPass(id);
    }

    public static async deletePass(id: number): Promise<boolean> {
        const passController = await PassController.getInstance();
        await passController.pass.destroy({
            where: {
                id: id
            }
        });

        const pass = await PassRepository.getPass(id);
        return pass === null;
    }
}
