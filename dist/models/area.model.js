"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("Area", {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        surface: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false
        },
        best_month: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 12
            }
        },
        visitor_capacity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
        visit_duration: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 1440
            }
        },
        disabled_access: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        },
        opening_time: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false
        },
        closing_time: {
            type: sequelize_1.DataTypes.TIME,
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
