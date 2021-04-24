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
exports.AreaController = void 0;
var models_1 = require("../models");
var area_repository_1 = require("../repositories/area.repository");
var condition_controller_1 = require("./condition.controller");
var AreaController = /** @class */ (function () {
    function AreaController(area, location, animal, maintain, image, type) {
        this.area = area;
        this.location = location;
        this.animal = animal;
        this.maintain = maintain;
        this.image = image;
        this.type = type;
    }
    AreaController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, area, location_1, animal, maintain, image, type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(AreaController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), area = _a.area, location_1 = _a.location, animal = _a.animal, maintain = _a.maintain, image = _a.image, type = _a.type;
                        AreaController.instance = new AreaController(area, location_1, animal, maintain, image, type);
                        _b.label = 2;
                    case 2: return [2 /*return*/, AreaController.instance];
                }
            });
        });
    };
    AreaController.prototype.createArea = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_repository_1.AreaRepository.createArea(props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaController.prototype.getAll = function (offset, limit, details) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = limit || 30;
                        offset = offset || 0;
                        if (!details) return [3 /*break*/, 2];
                        return [4 /*yield*/, area_repository_1.AreaRepository.getAllAreaDetails(offset, limit)];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, area_repository_1.AreaRepository.getAllAreas(offset, limit)];
                    case 3:
                        res = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (res.length > 0) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    AreaController.prototype.getArea = function (id, details) {
        return __awaiter(this, void 0, void 0, function () {
            var area;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!details) return [3 /*break*/, 2];
                        return [4 /*yield*/, area_repository_1.AreaRepository.getAreaDetails(id)];
                    case 1:
                        area = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, area_repository_1.AreaRepository.getArea(id)];
                    case 3:
                        area = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (area !== null) {
                            return [2 /*return*/, area];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AreaController.prototype.updateArea = function (id, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_repository_1.AreaRepository.updateArea(id, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaController.prototype.getAllMaintains = function (id_area, start_date) {
        return __awaiter(this, void 0, void 0, function () {
            var area, start_date_formated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.area.findByPk(id_area)];
                    case 1:
                        area = _a.sent();
                        if (area === null)
                            return [2 /*return*/, null];
                        if (start_date === null) {
                            start_date_formated = new Date(70, 1, 1);
                        }
                        else {
                            start_date_formated = this.convertStringDateInDateFormat(start_date);
                        }
                        if (start_date_formated === null)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, area_repository_1.AreaRepository.getAllMaintains(area, start_date_formated)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaController.prototype.getAllAreaInMaintain = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var date_formated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date_formated = null;
                        if (date !== null)
                            date_formated = this.convertStringDateInDateFormat(date);
                        return [4 /*yield*/, area_repository_1.AreaRepository.getAllAreaInMaintain(date_formated)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaController.prototype.deleteArea = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, area_repository_1.AreaRepository.deleteArea(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AreaController.prototype.areaIsOpen = function (area) {
        return __awaiter(this, void 0, void 0, function () {
            var conditionController, areaStatus, actualTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, condition_controller_1.ConditionController.getInstance()];
                    case 1:
                        conditionController = _a.sent();
                        return [4 /*yield*/, conditionController.getActualAreaStatus(area.id)];
                    case 2:
                        areaStatus = _a.sent();
                        actualTime = new Date().toLocaleTimeString();
                        if (areaStatus === null || areaStatus.label !== 'Open') {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, area.opening_time < actualTime && actualTime < area.closing_time];
                }
            });
        });
    };
    AreaController.prototype.convertStringDateInDateFormat = function (date) {
        try {
            var new_date = new Date(date);
            new_date.setUTCHours(0, 0, 0, 0);
            new_date.setDate((new_date.getDate() + 1));
            return new_date;
        }
        catch (_a) {
            return null;
        }
    };
    return AreaController;
}());
exports.AreaController = AreaController;
