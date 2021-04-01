import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    CreateOptions
} from "sequelize";
import { UserInstance } from "./user.model";

export interface WeekProps {
    id: number;
    start_date: Date;
    end_date: Date;
}

export interface WeekUpdateOption {
    start_date: Date;
    end_date: Date;
}

export interface WeekCreateOption {
    start_date: Date;
    end_date: Date;
}

export interface WeekCreationProps extends Optional<WeekProps, "id"> {}

export interface WeekInstance extends Model<WeekProps, WeekCreationProps>, WeekProps {
    getPresence: HasManyGetAssociationsMixin<UserInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<WeekInstance> {
    return sequelize.define<WeekInstance>("Week", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: true
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });

}