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
import {AreaInstance} from "./area.model";
import {PassageInstance} from "./passage.model";

export interface OrderProps {
    id: number;
    position: number;
}

export interface OrderUpdateProps {
    position: number;
}

export interface OrderCreationProps extends Optional<OrderProps, "id"> {
}

export interface OrderInstance extends Model<OrderProps, OrderCreationProps>, OrderProps
{
    setPass: BelongsToSetAssociationMixin<PassInstance, 'id'>;
    getPass: BelongsToGetAssociationMixin<PassInstance>;

    setArea: BelongsToSetAssociationMixin<AreaInstance, 'id'>;
    getArea: BelongsToGetAssociationMixin<AreaInstance>;

    setPassage: HasManySetAssociationsMixin<PassageInstance, 'id'>;
    getPassages: HasManyGetAssociationsMixin<PassageInstance>;
}

export default function (sequelize: Sequelize): ModelCtor<OrderInstance> {
    return sequelize.define<OrderInstance>("Order", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true,
    });
}
