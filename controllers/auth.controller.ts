import {ModelCtor} from "sequelize";
import {UserCreationProps, UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";
import {SequelizeManager} from "../models";
import {compare, hash} from "bcrypt";

export class AuthController {

    user: ModelCtor<UserInstance>;
    session: ModelCtor<SessionInstance>;

    private static instance: AuthController;

    public static async getInstance(): Promise<AuthController> {
        if(AuthController.instance === undefined) {
            const {user, session} = await SequelizeManager.getInstance();
            AuthController.instance = new AuthController(user, session);
        }
        return AuthController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, session: ModelCtor<SessionInstance>) {
        this.user = user;
        this.session = session;
    }

    public async subscribe(props: UserCreationProps): Promise<UserInstance | null> {
        
        const passwordHashed = await hash(props.password, 8)
        return this.user.create({
            ...props,
            password: passwordHashed
        });
    }


    public async getSession(token: string): Promise<SessionInstance | null> {
        return this.session.findOne({
            where: {
                token
            }
        });
    }

}