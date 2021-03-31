import { ModelCtor } from "sequelize";
import { UserInstance } from "../models/user.model";
import {SequelizeManager} from "../models";
import { RoleInstance, RoleUpdateOption } from "../models/role.model";
import {JobRepository} from "../repositories/job.repository";
import { RoleRepository } from "../repositories/role.repository";

export class RoleController {

    user: ModelCtor<UserInstance>;
    role: ModelCtor<RoleInstance>;

    private static instance: RoleController;

    public static async getInstance(): Promise<RoleController> {
        if(RoleController.instance === undefined) {
            const {user, role} = await SequelizeManager.getInstance();
            RoleController.instance = new RoleController(user, role);
        }
        return RoleController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, role: ModelCtor<RoleInstance>) {
        this.user = user;
        this.role = role;
    }

    public async getAll(offset: number | undefined, limit: number | undefined): Promise<RoleInstance[]> {

        limit = limit || 30;
        offset = offset || 0;
        
        const res = await this.role.findAll({
            attributes: ["label", "id"],
            limit, 
            offset
        });
           
        if(res.length > 0) {
            return res;
        }
        return [];
    }

    public async getAllRolesWithUsers(offset: number | undefined, limit: number | undefined): Promise<RoleInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await RoleRepository.getAllRolesWithUsers(offset, limit);

        if(res.length > 0) {
            return res;
        }
        return [];
    }

    public async createRole(label_role: string): Promise<RoleInstance | null> {

        return await this.role.create({
            label: label_role
        });
    }

    public async updateRole(id: number, props: RoleUpdateOption): Promise<RoleInstance |  null> {

        return RoleRepository.updateRole(id, props);
    }

    public async deleteRole(id: number): Promise<void |  null> {

        return await RoleRepository.deleteRole(id);
    }
}