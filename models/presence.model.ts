import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin
} from "sequelize";
import { UserInstance } from "./user.model";
import { WeekInstance } from "./week.model";

export interface PresenceProps {
    id: number;
    is_programmed: Boolean;
    is_worked: Boolean;
    is_available: Boolean;
}

export interface PresenceUpdateOption {
    is_programmed?: Boolean;
    is_worked?: Boolean;
    is_available?: Boolean;
}

export interface PresenceCreationProps extends Optional<PresenceProps, "is_programmed"> {}

export interface PresenceInstance extends Model<PresenceProps, PresenceCreationProps>, PresenceProps {
    getUser: HasManyGetAssociationsMixin<UserInstance>;
    getWeek: HasManyGetAssociationsMixin<WeekInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<PresenceInstance> {
    return sequelize.define<PresenceInstance>("Presence", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        is_programmed: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        is_worked: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}