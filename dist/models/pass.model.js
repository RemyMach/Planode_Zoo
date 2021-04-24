"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("Pass", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        number_of_days_of_validity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        number_of_use_per_month: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        is_night_pass: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true,
    });
}
exports.default = default_1;
