import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, HasManyAddAssociationMixin, HasManyGetAssociationsMixin
} from "sequelize";
import {LocationInstance} from "./location.model";
import { MaintainInstance } from "./maintain.model";

export interface AreaUpdateProps {
    name: string;
    description: string;
    image: string;
    surface: number;
    best_month: number;
    disabled_access: boolean;
}

export interface AreaProps {
    id: number;
    name: string;
    description: string;
    image: string;
    surface: number;
    best_month: number;
    disabled_access: boolean;
}

export interface AreaCreationProps extends Optional<AreaProps, "id"> {}

export interface AreaInstance extends Model<AreaProps, AreaCreationProps>, AreaProps {
    addLocation: HasManyAddAssociationMixin<LocationInstance, "id">;
    getLocations: HasManyGetAssociationsMixin<LocationInstance>;

    getMaintains: HasManyGetAssociationsMixin<MaintainInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<AreaInstance> {
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
        disabled_access: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}