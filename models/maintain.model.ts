import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    UpdateOptions
} from "sequelize";
import { AreaInstance } from "./area.model";
import { UserInstance } from "./user.model";

export interface MaintainProps {
    id: number;
    start_date: Date;
    end_date: Date;
}

export interface MaintainCreationOptionProps {
    start_date: string;
    end_date: string;
    user_id: number;
    area_id: number;
}

export interface MaintainUpdateOptionProps {
    start_date: string | Date;
    end_date: string | Date;
}

export interface MaintainCreationProps extends Optional<MaintainProps, "id"> {}

export interface MaintainInstance extends Model<MaintainProps, MaintainCreationProps>, MaintainProps {
    setArea: BelongsToSetAssociationMixin<AreaInstance, "id">;
    getArea: BelongsToGetAssociationMixin<AreaInstance>;

    addUser: BelongsToManyAddAssociationMixin<UserInstance, "id">;
    getUsers: BelongsToManyGetAssociationsMixin<UserInstance[]>;
}

export default function(sequelize: Sequelize): ModelCtor<MaintainInstance> {
    const maintain = sequelize.define<MaintainInstance>("Maintain", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });

    maintain.addHook('beforeUpdate', async (maintain: MaintainInstance, options: UpdateOptions<MaintainProps>) => {
        if(maintain.start_date > maintain.end_date)
            throw new Error("start_date must be greather than end_date");
    });

    maintain.addHook('beforeCreate', async (maintain: MaintainInstance, options: UpdateOptions<MaintainProps>) => {
        if(maintain.start_date > maintain.end_date)
            throw new Error("start_date must be greather than end_date");
    });


    return maintain;
}