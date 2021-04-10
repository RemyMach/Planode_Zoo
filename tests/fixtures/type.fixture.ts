import {SequelizeManager} from "../../models";
import {fixture} from "./fixture";
import {TypeInstance} from "../../models/type.model";

export class TypeFixture implements fixture{

    type_park?: TypeInstance;
    type_aviary?: TypeInstance;

    private static instance: TypeFixture;

    public static async getInstance(): Promise<TypeFixture> {
        if(TypeFixture.instance === undefined) {
            TypeFixture.instance = new TypeFixture();
        }
        return TypeFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();

        this.type_park = await manager.type.create({
            name: "park"
        });
        this.type_aviary = await manager.type.create({
            name: "aviary"
        });
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.area.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.type.destroy({
            truncate: true,
            force: true
        });
    }
}