import { SequelizeManager } from "../../models";
import {RoleInstance} from "../../models/role.model";
import { fixture } from "./fixture";

export class RoleFixture implements fixture{

    role_user?: RoleInstance;
    role_admin?: RoleInstance;
    role_super_admin?: RoleInstance;

    private static instance: RoleFixture;

    public static async getInstance(): Promise<RoleFixture> {
        if(RoleFixture.instance === undefined) {
            RoleFixture.instance = new RoleFixture();
        }
        return RoleFixture.instance;
    }

    private constructor() {};

    public async setUpTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        this.role_user = await manager.role.create({
            label: "user"
        });
        this.role_admin = await manager.role.create({
            label: "admin"
        });
        this.role_super_admin = await manager.role.create({
            label: "super_admin"
        });
    }
}