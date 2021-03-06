import {hash} from "bcrypt";
import {
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToSetAssociationMixin,
    CreateOptions,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {JobInstance} from "./job.model";
import {RoleInstance} from "./role.model";
import {SessionInstance} from "./session.model";
import {SessionRepository} from "../repositories/session.repository";
import { WeekInstance } from "./week.model";
import { PresenceInstance } from "./presence.model";
import { MaintainInstance } from "./maintain.model";


export interface UserUpdateOptions {
    name?: string,
    surname?: number;
    email?: number;
}

export interface UserUpdatePasswordOptions {
    password?: string,
    new_password?: string;
    new_password_confirm?: string;
}

export interface UserProps {
    id: number;
    name: string;
    surname: string;
    password: string;
    email: string;
}

export interface UserCreateProps {
    name: string;
    surname: string;
    password: string;
    email: string;
}

export interface UserCreationProps extends Optional<UserProps, "id"> {}

export interface UserInstance extends Model<UserProps, UserCreationProps>, UserProps {
    
    addSession: HasManyAddAssociationMixin<SessionInstance, "id">;
    getSessions: HasManyGetAssociationsMixin<SessionInstance>;

    setJob: BelongsToSetAssociationMixin<JobInstance, "id">;
    getJob: BelongsToGetAssociationMixin<JobInstance>;

    setRole: BelongsToSetAssociationMixin<RoleInstance, "id">;
    getRole: BelongsToGetAssociationMixin<RoleInstance>;

    getWeeks: HasManyGetAssociationsMixin<WeekInstance>;

    getPresence: HasManyGetAssociationsMixin<PresenceInstance>;

    addWeek: BelongsToManyAddAssociationMixin<WeekInstance, "id">;

    addMaintain: BelongsToManyAddAssociationMixin<MaintainInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<UserInstance> {
    const user = sequelize.define<UserInstance>("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 100],
                    msg: "Your password must be between 8 and 100 characters"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'email',
                msg: 'The email provide is already taken'
            },
            validate: {
                isEmail: true
            }
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true,
    });

    user.addHook('beforeCreate', async (user: UserInstance, options: CreateOptions<UserProps>) => {
        const passwordHashed = await hash(user.password, 8);
        user.password = passwordHashed;
    });

    user.addHook('beforeUpdate', async (user: UserInstance, options: CreateOptions<UserProps>) => {
        const passwordHashed = await hash(user.password, 8);
        user.password = passwordHashed;
    });

    user.addHook('beforeDestroy', async (user: UserInstance, options: CreateOptions<UserProps>) => {

        await SessionRepository.deleteSessionsFromAUser(user);
    });


    return user;
}
