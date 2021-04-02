import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin
} from "sequelize";
import {ConditionInstance} from "./condition.model";

export interface StatusProps {
    id: number;
    label: string;
}

export interface StatusUpdateOption {
    label: string;
}

export interface StatusCreationProps extends Optional<StatusProps, "id"> {}

export interface StatusInstance extends Model<StatusProps, StatusCreationProps>, StatusProps {
    getConditions: HasManyGetAssociationsMixin<ConditionInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<StatusInstance> {
    return sequelize.define<StatusInstance>("Status", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
