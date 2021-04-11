import {
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {AreaInstance} from "./area.model";

export interface ImageUpdateProps {
    image: string
}

export interface ImageProps {
    id: number;
    image: string;
}

export interface ImageCreationProps extends Optional<ImageProps, "id"> {}

export interface ImageInstance extends Model<ImageProps, ImageCreationProps>, ImageProps {
    setArea: HasOneSetAssociationMixin<AreaInstance, "id">;
    getArea: HasOneGetAssociationMixin<AreaInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<ImageInstance> {
    return sequelize.define<ImageInstance>("Image", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}