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
    in_use: boolean;
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
        in_use: {
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