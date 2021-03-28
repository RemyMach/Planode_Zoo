import {ModelCtor, ValidationError, Sequelize, Op} from "sequelize";
import {UserCreationProps, UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";
import {SequelizeManager} from "../models";
import {compare, hash} from "bcrypt";
import {Secret, sign, verify} from 'jsonwebtoken';
import { RoleInstance } from "../models/role.model";

export class AuthController {

    user: ModelCtor<UserInstance>;
    session: ModelCtor<SessionInstance>;
    role: ModelCtor<RoleInstance>;

    private static instance: AuthController;

    public static async getInstance(): Promise<AuthController> {
        if(AuthController.instance === undefined) {
            const {user, session, role} = await SequelizeManager.getInstance();
            AuthController.instance = new AuthController(user, session, role);
        }
        return AuthController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, session: ModelCtor<SessionInstance>, role: ModelCtor<RoleInstance>) {
        this.user = user;
        this.session = session;
        this.role = role;
    }

    public async subscribe(props: UserCreationProps): Promise<UserInstance> {

        return this.user.create({
            ...props
        })
    }

    public async log(email: string, password: string): Promise<SessionInstance | null> {

        const user = await this.user.findOne({
            where: {
                email
            }
        });
        if(user === null) {
            return null;
        }
        const isSamePassword = await compare(password, user.password);
        if(!isSamePassword) {
            return null;
        }
        const token = sign({ id: user.id.toString()}, process.env.JWT_SECRET as Secret);
        const session = await this.session.create({
            token
        });
        await session.setUser(user);
        return session;
    }


    public async getSession(token: string): Promise<SessionInstance | null> {
        try{
            // TODO vérifié avec l id user décodé aussi
            const decoded = verify(token, process.env.JWT_SECRET as Secret)
            console.log(decoded);
            const session = await this.session.findOne({
                where: {
                    token
                }
            });
            return session;
        }catch(e) {
            return null;
        }
    }

    public async getAdminSession(token: string): Promise<SessionInstance | null> {
        try{
            // TODO vérifié avec l id user décodé aussi
            const decoded = verify(token, process.env.JWT_SECRET as Secret)
            console.log(decoded);
            const session = await this.session.findOne({
                where: {
                    token
                },
                include: {
                    model: this.user,
                    include: [{
                        model: this.role,
                        where: {
                            label: 'administrateur'    
                        }
                    }],
                },
            });
            /*const session = await this.session.findOne({
                where: {
                    token
                },
                include: {
                    model: this.user,
                }});*/

            return session;
        }catch(e) {
            console.log(e);
            
            return null;
        }
    }

}