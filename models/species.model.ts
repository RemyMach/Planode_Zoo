import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface SpeciesProps {
    id: number;
    name: string;
}

export interface SpeciesCreationProps extends Optional<SpeciesProps, "id"> {}

export interface SpeciesInstance extends Model<SpeciesProps, SpeciesCreationProps>, SpeciesProps {

}

export default function(sequelize: Sequelize): ModelCtor<SpeciesInstance> {
    return sequelize.define<SpeciesInstance>("Species", {
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