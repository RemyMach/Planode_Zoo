"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("Location", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        entry_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        exit_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
exports.default = default_1;
