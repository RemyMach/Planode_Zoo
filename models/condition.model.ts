import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {AreaInstance} from "./area.model";
import {StatusInstance} from "./status.model";

export interface ConditionProps {
    id: number;
    date: Date;
}

export interface ConditionPropsCreate {
    date: Date;
}

export interface ConditionCreationProps extends Optional<ConditionProps, "id"> {}

export interface ConditionInstance extends Model<ConditionProps, ConditionCreationProps>, ConditionProps
{
    getArea: BelongsToGetAssociationMixin<AreaInstance>;
    setArea: BelongsToSetAssociationMixin<AreaInstance, "id">;

    getStatus: BelongsToGetAssociationMixin<StatusInstance>;
    setStatus: BelongsToSetAssociationMixin<StatusInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<ConditionInstance> {
    return sequelize.define<ConditionInstance>("Condition", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
