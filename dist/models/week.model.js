"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("Week", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        start_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            unique: true
        },
        end_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
exports.default = default_1;
