import {RoleController} from "../controllers/role.controller";
import {RoleInstance, RoleUpdateOption} from "../models/role.model";

export class RoleRepository {

    public static async getRoleById(id: number): Promise<RoleInstance | null> {
        const roleController = await RoleController.getInstance();
        return await roleController.role.findOne({
            where: {
                id
            }
        });
    }

    public static async getAllRolesWithUsers(offset: number, limit: number): Promise<RoleInstance[]> {
        const roleController = await RoleController.getInstance();
        return await roleController.role.findAll({
            attributes: ['label', 'id'],
            include: [{
                model: roleController.user,
                attributes: ['name', 'surname', 'email']
            }],
            offset,
            limit
        });
    }

    public static async updateRole(id: number, props: RoleUpdateOption): Promise<RoleInstance | null> {
        const roleController = await RoleController.getInstance();
        const props_convert = JSON.parse(JSON.stringify(props));
        await roleController.role.update(
            props_convert,
            {
                where: {
                    id
                }
            });

        return roleController.role.findOne({where: {id}});
    }

    public static async deleteRole(idRole: number): Promise<void | null> {
        const roleController = await RoleController.getInstance();

        await roleController.role.destroy({
            where: {
                id: idRole
            },
        });
    }
}