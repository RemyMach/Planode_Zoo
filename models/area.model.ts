import {
    BelongsToManyAddAssociationMixin,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {LocationInstance} from "./location.model";
import {StatusInstance} from "./status.model";
import {ConditionInstance} from "./condition.model";

export interface AreaUpdateProps {
    name: string;
    description: string;
    surface: number;
}

export interface AreaProps {
    id: number;
    name: string;
    description: string;
    surface: number;
}

export interface AreaCreationProps extends Optional<AreaProps, "id"> {
}

export interface AreaInstance extends Model<AreaProps, AreaCreationProps>, AreaProps {
    addLocation: HasManyAddAssociationMixin<LocationInstance, "id">;
    getLocations: HasManyGetAssociationsMixin<LocationInstance>;

    addStatus: BelongsToManyAddAssociationMixin<StatusInstance, "id">;

    getConditions: HasManyGetAssociationsMixin<ConditionInstance>;
}

export default function (sequelize: Sequelize): ModelCtor<AreaInstance> {
    return sequelize.define<AreaInstance>("Area", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        surface: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
