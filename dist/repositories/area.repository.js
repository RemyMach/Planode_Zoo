"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaRepository = void 0;
var area_controller_1 = require("../controllers/area.controller");
var sequelize_1 = require("sequelize");
var AreaRepository = /** @class */ (function () {
    function AreaRepository() {
    }
    AreaRepository.createArea = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var areaController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _a.sent();
                        return [4 /*yield*/, areaController.area.create(props)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaRepository.getAllAreas = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var areaController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _a.sent();
                        return [4 /*yield*/, areaController.area.findAll({
                                attributes: ['id', 'name', 'description', 'surface', 'best_month', 'visitor_capacity', 'visit_duration', 'disabled_access', 'opening_time', 'closing_time'],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaRepository.getAllAreaDetails = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var areaController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _a.sent();
                        return [4 /*yield*/, areaController.area.findAll({
                                attributes: ['id', 'name', 'description', 'surface', 'best_month', 'visitor_capacity', 'visit_duration', 'disabled_access', 'opening_time', 'closing_time'],
                                include: [{
                                        model: areaController.image,
                                        attributes: ['id', 'image']
                                    }, {
                                        model: areaController.type,
                                        attributes: ['id', 'name']
                                    }, {
                                        model: areaController.location,
                                        attributes: ['id', 'entry_date', 'exit_date'],
                                        include: [{
                                                model: areaController.animal,
                                                attributes: ['id', 'name']
                                            }]
                                    }],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaRepository.getArea = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var areaController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _a.sent();
                        return [4 /*yield*/, areaController.area.findOne({
                                attributes: ['id', 'name', 'description', 'surface', 'best_month', 'visitor_capacity', 'visit_duration', 'disabled_access', 'opening_time', 'closing_time'],
                                where: {
                                    id: id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaRepository.getAreaDetails = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var areaController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _a.sent();
                        return [4 /*yield*/, areaController.area.findOne({
                                attributes: ['id', 'name', 'description', 'surface', 'best_month', 'visitor_capacity', 'visit_duration', 'disabled_access', 'opening_time', 'closing_time'],
                                include: [{
                                        model: areaController.image,
                                        attributes: ['id', 'image']
                                    }, {
                                        model: areaController.type,
                                        attributes: ['id', 'name']
                                    }, {
                                        model: areaController.location,
                                        attributes: ['id', 'entry_date', 'exit_date'],
                                        include: [{
                                                model: areaController.animal,
                                                attributes: ['id', 'name']
                                            }]
                                    }],
                                where: {
                                    id: id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaRepository.updateArea = function (id, props) {
        return __awaiter(this, void 0, void 0, function () {
            var areaController, area, props_convert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _a.sent();
                        return [4 /*yield*/, areaController.getArea(id, false)];
                    case 2:
                        area = _a.sent();
                        props_convert = JSON.parse(JSON.stringify(props));
                        if (area === undefined || (area === null || area === void 0 ? void 0 : area.id) === undefined) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, areaController.area.update(props_convert, {
                                where: {
                                    id: area.id
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, areaController.getArea(id, false)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaRepository.deleteArea = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var areaController, area;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _a.sent();
                        return [4 /*yield*/, areaController.area.destroy({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, areaController.getArea(id, false)];
                    case 3:
                        area = _a.sent();
                        return [2 /*return*/, area === null];
                }
            });
        });
    };
    AreaRepository.getAllMaintains = function (area, start_date) {
        return __awaiter(this, void 0, void 0, function () {
            var areaController;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _b.sent();
                        return [4 /*yield*/, areaController.area.findAll({
                                attributes: { exclude: ['created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt'] },
                                where: {
                                    id: area.id
                                },
                                include: [{
                                        model: areaController.maintain,
                                        where: {
                                            start_date: (_a = {},
                                                _a[sequelize_1.Op.gte] = start_date,
                                                _a)
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    AreaRepository.getAllAreaInMaintain = function (date_research) {
        return __awaiter(this, void 0, void 0, function () {
            var date, areaController, res;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        date = new Date;
                        if (date_research !== null)
                            date = date_research;
                        return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 1:
                        areaController = _c.sent();
                        return [4 /*yield*/, areaController.area.findAll({
                                attributes: { exclude: ['created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt'] },
                                include: [{
                                        model: areaController.maintain,
                                        required: true,
                                        where: {
                                            start_date: (_a = {},
                                                _a[sequelize_1.Op.lte] = date,
                                                _a),
                                            end_date: (_b = {},
                                                _b[sequelize_1.Op.gte] = date,
                                                _b)
                                        }
                                    }]
                            })];
                    case 2:
                        res = _c.sent();
                        return [2 /*return*/, res === undefined ? null : res];
                }
            });
        });
    };
    return AreaRepository;
}());
exports.AreaRepository = AreaRepository;
