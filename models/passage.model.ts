import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {AreaInstance} from "./area.model";
import {TicketInstance} from "./ticket.model";

export interface PassageProps {
    id: number;
    date: Date;
    is_inside_the_area: boolean;
}

export interface PassageCreationProps extends Optional<PassageProps, "id"> {
}

export interface PassageInstance extends Model<PassageProps, PassageCreationProps>, PassageProps {
    setArea: BelongsToSetAssociationMixin<AreaInstance, 'id'>;
    getArea: BelongsToGetAssociationMixin<AreaInstance>;

    setTicket: BelongsToSetAssociationMixin<TicketInstance, 'id'>;
    getTicket: BelongsToGetAssociationMixin<TicketInstance>;
}

export default function (sequelize: Sequelize): ModelCtor<PassageInstance> {
    return sequelize.define<PassageInstance>("Passage", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_inside_the_area: {
            type: DataTypes.SMALLINT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true,
    });
}
