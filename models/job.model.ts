import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin
} from "sequelize";
import { UserInstance } from "./user.model";

export interface JobProps {
    id: number;
    label: string;
}

export interface JobUpdateOption {
    label: string
}

export interface JobCreationProps extends Optional<JobProps, "id"> {}

export interface JobInstance extends Model<JobProps, JobCreationProps>, JobProps {
    getUsers: HasManyGetAssociationsMixin<UserInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<JobInstance> {
    return sequelize.define<JobInstance>("Job", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}