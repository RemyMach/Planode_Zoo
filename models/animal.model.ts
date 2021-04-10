import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {RaceInstance} from "./race.model";
import {HealthcareInstance} from "./healthcare.model";
import {LocationInstance} from "./location.model";

export interface AnimalUpdateProps {
    name: string;
    birthdate: Date;
    height: number;
    weight: number;
}

export interface AnimalProps {
    id: number;
    name: string;
    birthdate: Date;
    height: number;
    weight: number;
}

export interface AnimalCreationProps extends Optional<AnimalProps, "id"> {}

export interface AnimalInstance extends Model<AnimalProps, AnimalCreationProps>, AnimalProps {
    setRace: BelongsToSetAssociationMixin<RaceInstance, "id">;
    getRace: BelongsToGetAssociationMixin<RaceInstance>;

    addHealthcare: HasManyAddAssociationMixin<HealthcareInstance, "id">;
    getHealthcare: HasManyGetAssociationsMixin<HealthcareInstance>;

    getLocation: BelongsToGetAssociationMixin<LocationInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<AnimalInstance> {
    return sequelize.define<AnimalInstance>("Animal", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        height: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        weight: {
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