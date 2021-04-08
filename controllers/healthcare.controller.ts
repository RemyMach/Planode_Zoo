import { ModelCtor } from "sequelize";
import { SequelizeManager } from "../models";
import { AnimalInstance } from "../models/animal.model";
import { HealthcareInstance, HealthcareUpdateProps } from "../models/healthcare.model";
import { HealthcareRepository } from "../repositories/healthcare.repository";

export class HealthcareController {

    animal: ModelCtor<AnimalInstance>;
    healthcare: ModelCtor<HealthcareInstance>;

    private static instance: HealthcareController;

    public static async getInstance(): Promise<HealthcareController> {
        if(HealthcareController.instance === undefined) {
            const { animal, healthcare } = await SequelizeManager.getInstance();
            HealthcareController.instance = new HealthcareController(animal, healthcare);
        }
        return HealthcareController.instance;
    }

    private constructor(animal: ModelCtor<AnimalInstance>, healthcare: ModelCtor<HealthcareInstance>) {
        this.animal = animal;
        this.healthcare = healthcare;
    }

    public async createHealthcare(props: HealthcareUpdateProps): Promise<HealthcareInstance | null> {
        return await HealthcareRepository.createHealthcare(props);
    }

    public async getAll(offset: number | undefined, limit: number | undefined, details: boolean): Promise<HealthcareInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        let res: HealthcareInstance[];
        if (details) {
            res = await HealthcareRepository.getAllHealthcareDetails(offset, limit);
        } else {
            res = await HealthcareRepository.getAllHealthcare(offset, limit);
        }

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getHealthcareById(id: number, details: boolean): Promise<HealthcareInstance | null> {
        let healthcare: HealthcareInstance | null;
        if (details) {
            healthcare = await HealthcareRepository.getHealthcareDetailsById(id);
        } else {
            healthcare = await HealthcareRepository.getHealthcareById(id);
        }

        if(healthcare !== null) {
            return healthcare;
        }

        return null;
    }

    public async updateHealthcare(id: number, props: HealthcareUpdateProps): Promise<HealthcareInstance | null> {
        return await HealthcareRepository.updateHealthcare(id, props);
    }

    public async deleteHealthcare(id: number): Promise<boolean> {
        return await HealthcareRepository.deleteHealthcare(id);
    }
}