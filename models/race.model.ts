import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface RaceProps {
    id: number;
    breed: string;
}

export interface RaceCreationProps extends Optional<RaceProps, "id"> {}

export interface RaceInstance extends Model<RaceProps, RaceCreationProps>, RaceProps {

}

export default function(sequelize: Sequelize): ModelCtor<RaceInstance> {
    return sequelize.define<RaceInstance>("Race", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        breed: {
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