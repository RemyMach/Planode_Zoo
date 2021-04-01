import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin
} from "sequelize";
import { UserInstance } from "./user.model";

export interface PresenceProps {
    id: number;
    is_programmed: Boolean;
    is_worked: Boolean;
    is_available: Boolean;
}

export interface presenceUpdateOption {
    is_programmed?: Boolean;
    is_worked?: Boolean;
    is_available?: Boolean;
}

export interface PresenceCreationProps extends Optional<PresenceProps, "id"> {}

export interface PresenceInstance extends Model<PresenceProps, PresenceCreationProps>, PresenceProps {
    getPresence: HasManyGetAssociationsMixin<UserInstance>;
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