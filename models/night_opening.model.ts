import {
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";

export interface NightOpeningProps {
    id: number;
    new_closing_date: Date;
}

export interface NightOpeningUpdateProps {
    new_closing_date: Date;
}

export interface NightOpeningCreationProps extends Optional<NightOpeningProps, "id"> {
}

export interface NightOpeningInstance extends Model<NightOpeningProps, NightOpeningCreationProps>, NightOpeningProps{
}

export default function (sequelize: Sequelize): ModelCtor<NightOpeningInstance> {
    return sequelize.define<NightOpeningInstance>("Night_Opening", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        new_closing_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true,
    });
}
