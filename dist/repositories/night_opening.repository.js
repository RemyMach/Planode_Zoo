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
exports.NightOpeningRepository = void 0;
var night_opening_controller_1 = require("../controllers/night_opening.controller");
var sequelize_1 = require("sequelize");
var NightOpeningRepository = /** @class */ (function () {
    function NightOpeningRepository() {
    }
    NightOpeningRepository.getAllNightOpenings = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var nightOpeningController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                    case 1:
                        nightOpeningController = _a.sent();
                        return [4 /*yield*/, nightOpeningController.night_opening.findAll({
                                attributes: ['id', 'new_closing_date'],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NightOpeningRepository.getNightOpening = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var nightOpeningController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                    case 1:
                        nightOpeningController = _a.sent();
                        return [4 /*yield*/, nightOpeningController.night_opening.findOne({
                                attributes: ['id', 'new_closing_date'],
                                where: {
                                    id: id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NightOpeningRepository.searchNightOpeningByDate = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var nightOpeningController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                    case 1:
                        nightOpeningController = _a.sent();
                        return [4 /*yield*/, nightOpeningController.night_opening.findOne({
                                where: {
                                    new_closing_date: date
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NightOpeningRepository.updateNightOpening = function (id, new_closing_date) {
        return __awaiter(this, void 0, void 0, function () {
            var nightOpeningController, nightOpening, props_convert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                    case 1:
                        nightOpeningController = _a.sent();
                        return [4 /*yield*/, NightOpeningRepository.getNightOpening(id)];
                    case 2:
                        nightOpening = _a.sent();
                        if (nightOpening === undefined || (nightOpening === null || nightOpening === void 0 ? void 0 : nightOpening.id) === undefined) {
                            return [2 /*return*/, null];
                        }
                        props_convert = JSON.parse(JSON.stringify({ new_closing_date: new_closing_date }));
                        return [4 /*yield*/, nightOpeningController.night_opening.update(props_convert, {
                                where: {
                                    id: nightOpening.id
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, NightOpeningRepository.getNightOpening(id)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NightOpeningRepository.deleteNightOpening = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var nightOpeningController, NightOpening;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                    case 1:
                        nightOpeningController = _a.sent();
                        return [4 /*yield*/, nightOpeningController.night_opening.destroy({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, NightOpeningRepository.getNightOpening(id)];
                    case 3:
                        NightOpening = _a.sent();
                        return [2 /*return*/, NightOpening === null];
                }
            });
        });
    };
    NightOpeningRepository.fixDateType = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                date.setUTCHours(0, 0, 0, 0);
                date.setDate((date.getDate() + 1));
                date.setMonth((date.getMonth() - 1));
                return [2 /*return*/, date];
            });
        });
    };
    NightOpeningRepository.zooIsOpen = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var nightOpeningController, max_time, night_openings;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                    case 1:
                        nightOpeningController = _b.sent();
                        return [4 /*yield*/, NightOpeningRepository.getMaxNightTime(date)];
                    case 2:
                        max_time = _b.sent();
                        return [4 /*yield*/, nightOpeningController.night_opening.findAll({
                                attributes: ['new_closing_date'],
                                where: {
                                    new_closing_date: (_a = {},
                                        _a[sequelize_1.Op.gte] = date,
                                        _a[sequelize_1.Op.lte] = max_time,
                                        _a)
                                }
                            })];
                    case 3:
                        night_openings = _b.sent();
                        return [2 /*return*/, night_openings.length > 0];
                }
            });
        });
    };
    NightOpeningRepository.getMaxNightTime = function (actual_date_time) {
        return __awaiter(this, void 0, void 0, function () {
            var date;
            return __generator(this, function (_a) {
                date = new Date(actual_date_time);
                date.setUTCHours(8, 0, 0);
                if (actual_date_time.getHours() > 8) {
                    date.setDate(date.getDate() + 1);
                }
                return [2 /*return*/, date];
            });
        });
    };
    return NightOpeningRepository;
}());
exports.NightOpeningRepository = NightOpeningRepository;
