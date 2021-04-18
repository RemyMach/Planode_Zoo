import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {PassInstance} from "./pass.model";
import {PassageInstance} from "./passage.model";

export interface TicketProps {
    id: number;
    date_of_purchase: Date;
}

export interface TicketUpdateProps {
    date_of_purchase: Date;
}

export interface TicketCreationProps extends Optional<TicketProps, "id"> {
}

export interface TicketInstance extends Model<TicketProps, TicketCreationProps>, TicketProps {
    setPass: BelongsToSetAssociationMixin<PassInstance, 'id'>;
    getPass: BelongsToGetAssociationMixin<PassInstance>;

    setPassage: HasManySetAssociationsMixin<PassageInstance, 'id'>;
    getPassages: HasManyGetAssociationsMixin<PassageInstance>;
}

export default function (sequelize: Sequelize): ModelCtor<TicketInstance> {
    return sequelize.define<TicketInstance>("Ticket", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date_of_purchase: {
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
