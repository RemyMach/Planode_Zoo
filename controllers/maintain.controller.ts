import { ModelCtor } from "sequelize";
import { UserInstance } from "../models/user.model";
import {SequelizeManager} from "../models";
import { JobInstance, JobProps, JobUpdateOption } from "../models/job.model";
import {JobRepository} from "../repositories/job.repository";
import { MaintainCreationOptionProps, MaintainGetOption, MaintainInstance, MaintainUpdateOptionProps } from "../models/maintain.model";
import { AreaInstance } from "../models/area.model";
import { MaintainRepository } from "../repositories/maintain.repository";
import { UserRepository } from "../repositories/user.repository";

export class MaintainController {

    user: ModelCtor<UserInstance>;
    maintain: ModelCtor<MaintainInstance>;
    area: ModelCtor<AreaInstance>;
    possibleJobsForMaintain: string[];

    private static instance: MaintainController;

    public static async getInstance(): Promise<MaintainController> {
        if(MaintainController.instance === undefined) {
            const {user, maintain, area} = await SequelizeManager.getInstance();
            MaintainController.instance = new MaintainController(user, maintain, area, ["veterinary", "healer", "service_agent"]);
        }
        return MaintainController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, maintain: ModelCtor<MaintainInstance>, area: ModelCtor<AreaInstance>, possibleJobsForMaintain: string[]) {
        this.user = user;
        this.maintain = maintain;
        this.area = area;
        this.possibleJobsForMaintain = possibleJobsForMaintain;
    }

    public async createAMaintain(props: MaintainCreationOptionProps): Promise<MaintainInstance | null> {

        const start_date_formated = this.convertStringDateInDateFormat(props.start_date);
        const end_date_formated = this.convertStringDateInDateFormat(props.end_date);
        if(start_date_formated === null || end_date_formated === null) {
            return null;
        }

        return await MaintainRepository.createMaintain(
            start_date_formated,
            end_date_formated,
            props.user_id,
            props.area_id
        );
    }

    public async deleteAMaintain(maintain_id: number): Promise<Boolean | null> {

        return await MaintainRepository.deleteAMaintainById(maintain_id);
    }

    public async updateAMaintain(maintain_id: number, props: MaintainUpdateOptionProps): Promise<MaintainInstance | null> {


        const maintain: MaintainInstance | null = await this.maintain.findByPk(maintain_id);
        if(maintain === null)
            return null
        
        this.formateUpdateOption(props);

        return await MaintainRepository.updateAMaintain(maintain, props);
    }

    public async addAUserToAMaintain(maintain_id: number, user_id: number): Promise<MaintainInstance | null> {

        const maintain: MaintainInstance | null = await this.maintain.findByPk(maintain_id);
        if(maintain === null)
            return null;
        
        const user: UserInstance | null = await UserRepository.getUserByIdAndVerifyJob(user_id, this.possibleJobsForMaintain);
        if(user === null)
            return null;

        await user.addMaintain(maintain);

        return await MaintainRepository.getMaintainById(maintain_id);
    }

    public async getMaintainWithUsers(maintain_id: number): Promise<MaintainInstance | null> {
        const maintain : MaintainInstance | null = await this.maintain.findByPk(maintain_id);
        if(maintain === null)
            return null;

        return await MaintainRepository.getMaintainById(maintain_id);
    }

    public async getMaintainsSinceADate(props : MaintainGetOption) {

        this.formateGetOption(props);
        return await MaintainRepository.getMaintainsSinceADate(props);
    }

    private convertStringDateInDateFormat(date: string): Date | null {
        try{
            const new_date = new Date(date);
            new_date.setUTCHours(0, 0, 0, 0);
            new_date.setDate((new_date.getDate() + 1))
            return new_date;
        }catch {
            return null;
        }
    }

    private formateUpdateOption(props: MaintainUpdateOptionProps): void {

        if(props.start_date !== undefined && typeof props.start_date === 'string') {

            let start_date_formated = this.convertStringDateInDateFormat(props.start_date);
            if(start_date_formated !== null) {
                props.start_date = start_date_formated;
            }
        }
        if(props.end_date !== undefined && typeof props.end_date === 'string') {

            let end_date_formated = this.convertStringDateInDateFormat(props.end_date);
            if(end_date_formated !== null) {
                props.end_date = end_date_formated;
            }
        }
    }

    private formateGetOption(props: MaintainGetOption): void {

        if(props.start_date !== undefined && typeof props.start_date === 'string') {

            let start_date_formated = this.convertStringDateInDateFormat(props.start_date);
            if(start_date_formated !== null) {
                props.start_date = start_date_formated;
            }
        }
    }

}