"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("Animal", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        height: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        weight: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
exports.default = default_1;
