import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToGetAssociationMixin, BelongsToSetAssociationMixin
} from "sequelize";
import {AreaInstance} from "./area.model";
import {StatusInstance} from "./status.model";

export interface ConditionProps {
    id: number;
    date: Date;
}

export interface ConditionCreationProps extends Optional<ConditionProps, "id"> {}

export interface ConditionInstance extends Model<ConditionProps, ConditionCreationProps>, ConditionProps
{
    addArea: BelongsToSetAssociationMixin<AreaInstance, "id">;
    getArea: BelongsToGetAssociationMixin<AreaInstance>;

    addStatus: BelongsToSetAssociationMixin<StatusInstance, "id">;
    getStatus: BelongsToGetAssociationMixin<StatusInstance>;
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
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
