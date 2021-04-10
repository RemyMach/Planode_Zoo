import {
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {AnimalInstance} from "./animal.model";
import {AreaInstance} from "./area.model";

export interface LocationUpdateProps {
    entry_date: Date;
    exit_date: Date | null;
}

export interface LocationProps {
    id: number;
    entry_date: Date;
    exit_date: Date | null;
}

export interface LocationCreationProps extends Optional<LocationProps, "id"> {}

export interface LocationInstance extends Model<LocationProps, LocationCreationProps>, LocationProps {
    setAnimal: HasOneSetAssociationMixin<AnimalInstance, "id">;
    getAnimal: HasOneGetAssociationMixin<AnimalInstance>;

    setArea: HasOneSetAssociationMixin<AreaInstance, "id">;
    getArea: HasOneGetAssociationMixin<AreaInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<LocationInstance> {
    return sequelize.define<LocationInstance>("Location", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        entry_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        exit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}