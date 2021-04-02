import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasOneSetAssociationMixin,
    HasOneGetAssociationMixin
} from "sequelize";
import {AnimalInstance} from "./animal.model";

export interface LocationProps {
    id: number;
    entry_date: Date;
    exit_date: Date | null;
}

export interface LocationCreationProps extends Optional<LocationProps, "id"> {}

export interface LocationInstance extends Model<LocationProps, LocationCreationProps>, LocationProps {
    setAnimal: HasOneSetAssociationMixin<AnimalInstance, "id">;
    getAnimal: HasOneGetAssociationMixin<AnimalInstance>;
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
            allowNull: false
        },
        exit_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}