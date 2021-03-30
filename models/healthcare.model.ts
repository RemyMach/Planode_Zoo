import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToGetAssociationMixin
} from "sequelize";
import {AnimalInstance} from "./animal.model";

export interface HealthcareProps {
    id: number;
    date: Date;
    name: number;
    notes: string;
    cost: number;
    success: boolean;
}

export interface HealthCareCreationProps extends Optional<HealthcareProps, "id"> {}

export interface HealthcareInstance extends Model<HealthcareProps, HealthCareCreationProps>, HealthcareProps {
    getAnimal: BelongsToGetAssociationMixin<AnimalInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<HealthcareInstance> {
    return sequelize.define<HealthcareInstance>("Healthcare", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cost: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        success: {
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