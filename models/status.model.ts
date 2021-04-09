import {
    BelongsToManyAddAssociationMixin,
    DataTypes,
    HasManyAddAssociationsMixin,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {AreaInstance} from "./area.model";
import {ConditionInstance} from "./condition.model";

export interface StatusProps {
    id: number;
    label: string;
}

export interface StatusUpdateProps {
    label: string;
}

export interface StatusCreationProps extends Optional<StatusProps, "id"> {
}

export interface StatusInstance extends Model<StatusProps, StatusCreationProps>, StatusProps {
    addArea: BelongsToManyAddAssociationMixin<AreaInstance, "id">;

    getConditions: HasManyGetAssociationsMixin<ConditionInstance>;
}

export default function (sequelize: Sequelize): ModelCtor<StatusInstance> {
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
        timestamps: true,
    });
}
