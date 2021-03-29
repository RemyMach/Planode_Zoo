import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface AreaProps {
    id: number;
    name: string;
    description: string;
    surface: number;
    slots: number;
}

export interface AreaCreationProps extends Optional<AreaProps, "id"> {}

export interface AreaInstance extends Model<AreaProps, AreaCreationProps>, AreaProps {

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
        surface: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        slots: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}