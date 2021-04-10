import { MaintainController } from "../controllers/maintain.controller";
import { MaintainCreationOptionProps, MaintainInstance, MaintainUpdateOptionProps } from "../models/maintain.model";


export class MaintainRepository {

    public static async createMaintain(start_date: Date, end_date: Date, user_id: number, area_id: number): Promise<MaintainInstance | null> {
        const maintainController = await MaintainController.getInstance();
        const area = await maintainController.area.findByPk(area_id);
        const user = await maintainController.user.findByPk(user_id);

        if(user === null || area === null) {
            return null;
        }

        let maintain : MaintainInstance | null;
        try {
            maintain = await maintainController.maintain.create({
                start_date,
                end_date,
            });

            await maintain.setArea(area);
            await maintain.addUser(user);
        }catch {
            return null
        }
        
    
        return await this.getMaintainById(maintain.id);
    }

    public static async getMaintainById(id: number): Promise<MaintainInstance | null> {
        const maintainController = await MaintainController.getInstance();
        return await maintainController.maintain.findOne({
            where: {
                id
            }, include: [{
                model: maintainController.area
            },{
                model: maintainController.user
            }],
        });
    }

    public static async deleteAMaintainById(id: number): Promise< Boolean | null> {
        const maintainController = await MaintainController.getInstance();
        const maintain_to_destroy = await maintainController.maintain.findOne({
            where: {
                id,
            },
            paranoid: true
        });

        if(maintain_to_destroy === null)
            return null;
        
        try {
            await maintain_to_destroy.destroy();
        }catch {
            return null;
        }
        
        return true;
    }

    public static async updateAMaintain(maintain: MaintainInstance, props: MaintainUpdateOptionProps): Promise<MaintainInstance | null> {

        const props_parse = JSON.parse(JSON.stringify(props));
        let maintain_update: MaintainInstance;
        try {

            maintain_update = await maintain.update(props_parse);

        }catch {
            return null;
        }

        if(maintain_update === null)
                return null;
        
        return maintain_update;
    }

}