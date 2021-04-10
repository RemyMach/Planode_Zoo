import {DataTypes, HasManyGetAssociationsMixin, Model, ModelCtor, Optional, Sequelize} from "sequelize";
import {AreaInstance} from "./area.model";

export interface TypeUpdateProps {
    name: string
}

export interface TypeProps {
    id: number;
    name: string;
}

export interface TypeCreationProps extends Optional<TypeProps, "id"> {}

export interface TypeInstance extends Model<TypeProps, TypeCreationProps>, TypeProps {
    getArea: HasManyGetAssociationsMixin<AreaInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<TypeInstance> {
    return sequelize.define<TypeInstance>("Type", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}