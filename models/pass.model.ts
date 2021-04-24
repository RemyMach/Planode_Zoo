import {
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {TicketInstance} from "./ticket.model";
import {OrderInstance} from "./order.model";

export interface PassProps {
    id: number;
    number_of_days_of_validity: number;
    number_of_use_per_month: number;
    is_night_pass: boolean;
}

export interface PassUpdateProps {
    number_of_days_of_validity: number;
    number_of_use_per_month: number;
    is_night_pass: boolean;
}

export interface PassCreationProps extends Optional<PassProps, "id"> {
}

export interface PassInstance extends Model<PassProps, PassCreationProps>, PassProps {
    getTickets: HasManyGetAssociationsMixin<TicketInstance>;

    setOrder: HasManySetAssociationsMixin<OrderInstance, 'id'>;
    getOrders: HasManyGetAssociationsMixin<OrderInstance>;
}

export default function (sequelize: Sequelize): ModelCtor<PassInstance> {
    return sequelize.define<PassInstance>("Pass", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        number_of_days_of_validity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        number_of_use_per_month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_night_pass: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true,
    });
}
