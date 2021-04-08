import { HealthcareInstance, HealthcareUpdateProps } from "../models/healthcare.model";
import { HealthcareController } from "../controllers/healthcare.controller";


export class HealthcareRepository {

    public static async createHealthcare(props: HealthcareUpdateProps): Promise<HealthcareInstance | null> {
        const healthcareController = await HealthcareController.getInstance();
        return await healthcareController.healthcare.create(props);
    }

    public static async getAllHealthcare(offset: number, limit: number): Promise<HealthcareInstance[]> {
        const healthcareController = await HealthcareController.getInstance();
        return await healthcareController.healthcare.findAll({
            attributes: ['id', 'date', 'name', 'notes', 'cost', 'success'],
            offset,
            limit
        });
    }

    public static async getAllHealthcareDetails(offset: number, limit: number): Promise<HealthcareInstance[]> {
        const healthcareController = await HealthcareController.getInstance();
        return await healthcareController.healthcare.findAll({
            attributes: ['id', 'date', 'name', 'notes', 'cost', 'success'],
            include: [{
                model: healthcareController.animal,
                attributes: ['id', 'name', 'birthdate', 'height', 'weight']
            }],
            offset,
            limit
        });
    }

    public static async getHealthcareById(id: number): Promise<HealthcareInstance | null> {
        const healthcareController = await HealthcareController.getInstance();

        return await healthcareController.healthcare.findOne({
            attributes: ['id', 'date', 'name', 'notes', 'cost', 'success'],
            where: {
                id
            }
        });
    }

    public static async getHealthcareDetailsById(id: number): Promise<HealthcareInstance | null> {
        const healthcareController = await HealthcareController.getInstance();

        return await healthcareController.healthcare.findOne({
            attributes: ['id', 'date', 'name', 'notes', 'cost', 'success'],
            include: [{
                model: healthcareController.animal,
                attributes: ['id', 'name', 'birthdate', 'height', 'weight']
            }],
            where: {
                id
            }
        });
    }

    public static async updateHealthcare(id: number, props: HealthcareUpdateProps): Promise<HealthcareInstance | null> {
        const healthcareController = await HealthcareController.getInstance();
        const healthcare = await healthcareController.getHealthcareById(id, false);

        const props_convert = JSON.parse(JSON.stringify(props));

        if(healthcare === undefined || healthcare?.id === undefined) {
            return null;
        }
        await healthcareController.healthcare.update(
            props_convert,
            {
                where: {
                    id: healthcare.id
                }
            });

        return await healthcareController.getHealthcareById(id, false);
    }

    public static async deleteHealthcare(id: number): Promise<boolean> {
        const healthcareController = await HealthcareController.getInstance();
        await healthcareController.healthcare.destroy({
            where: {
                id
            }
        });

        const healthcare = await healthcareController.getHealthcareById(id, false);
        return healthcare === null;
    }
}