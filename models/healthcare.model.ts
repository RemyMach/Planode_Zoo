import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface HelthcareProps {
    id: number;
    date: Date;
    name: number;
    notes: string;
    cost: number;
    success: boolean;
}

export interface HealthCareCreationProps extends Optional<HelthcareProps, "id"> {}

export interface HealthcareInstance extends Model<HelthcareProps, HealthCareCreationProps>, HelthcareProps {

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