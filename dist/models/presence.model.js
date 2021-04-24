"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("Presence", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        is_programmed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        is_worked: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        is_available: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
exports.default = default_1;
