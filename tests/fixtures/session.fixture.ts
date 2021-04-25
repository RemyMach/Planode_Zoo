import {SequelizeManager} from "../../models";
import {SessionInstance} from "../../models/session.model";
import {fixture} from "./fixture";
import {Secret, sign} from 'jsonwebtoken';
import {UserFixture} from './user.fixture';

export class SessionFixture implements fixture{

    session_user_admin?: SessionInstance;
    session_user_normal?: SessionInstance;
    session_user_super_admin?: SessionInstance;

    private static instance: SessionFixture;

    public static async getInstance(): Promise<SessionFixture> {
        if(SessionFixture.instance === undefined) {
            SessionFixture.instance = new SessionFixture();
        }
        return SessionFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const userFixture = await UserFixture.getInstance();
        
        this.session_user_admin = await manager.session.create({
            token: sign({ id: userFixture.user_admin_receptionist?.id.toString()}, process.env.JWT_SECRET as Secret)
        });
        userFixture.user_admin_receptionist?.addSession(this.session_user_admin);

        this.session_user_normal = await manager.session.create({
            token: sign({ id: userFixture.user_normal_healer?.id.toString()}, process.env.JWT_SECRET as Secret)
        });
        userFixture.user_normal_healer?.addSession(this.session_user_normal);

        this.session_user_super_admin = await manager.session.create({
            token: sign({ id: userFixture.user_super_admin?.id.toString()}, process.env.JWT_SECRET as Secret)
        });
        userFixture.user_super_admin?.addSession(this.session_user_super_admin);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.user.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.session.destroy({
            truncate: true,
            force: true
        });
    }
}