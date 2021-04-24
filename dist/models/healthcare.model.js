"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("Healthcare", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        cost: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        success: {
            type: sequelize_1.DataTypes.BOOLEAN,
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
