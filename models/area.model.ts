import {
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationMixin, BelongsToSetAssociationMixin,
    DataTypes,
    HasManyGetAssociationsMixin, HasManySetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {LocationInstance} from "./location.model";
import {StatusInstance} from "./status.model";
import {ConditionInstance} from "./condition.model";

import {MaintainInstance} from "./maintain.model";
import {TypeInstance} from "./type.model";

export interface AreaUpdateProps {
    name: string;
    description: string;
    image: string;
    surface: number;
    best_month: number;
    visitor_capacity: number;
    visit_duration: number;
    disabled_access: boolean;
    opening_time: string;
    closing_time: string;
}

export interface AreaProps {
    id: number;
    name: string;
    description: string;
    image: string;
    surface: number;
    best_month: number;
    visitor_capacity: number;
    visit_duration: number;
    disabled_access: boolean;
    opening_time: string;
    closing_time: string;
}

export interface AreaCreationProps extends Optional<AreaProps, "id"> {
}

export interface AreaInstance extends Model<AreaProps, AreaCreationProps>, AreaProps {
    getLocations: HasManyGetAssociationsMixin<LocationInstance>;

    setType: BelongsToSetAssociationMixin<TypeInstance, "id">;
    getType: BelongsToGetAssociationMixin<TypeInstance>;

    addCondition: HasManySetAssociationsMixin<StatusInstance, "id">;
    getConditions: HasManyGetAssociationsMixin<ConditionInstance>;

    getMaintains: HasManyGetAssociationsMixin<MaintainInstance>;
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
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        surface: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        best_month: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 12
            }
        },
        visitor_capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
        visit_duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 1_440
            }
        },
        disabled_access: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        opening_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        closing_time: {
            type: DataTypes.TIME,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
