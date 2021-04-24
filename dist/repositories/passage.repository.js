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
exports.PassageRepository = void 0;
var passage_controller_1 = require("../controllers/passage.controller");
var sequelize_1 = require("sequelize");
var PassageRepository = /** @class */ (function () {
    function PassageRepository() {
    }
    PassageRepository.getAllPassage = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id', 'date', 'is_inside_the_area'],
                                include: [{
                                        model: passageController.ticket,
                                        attributes: ['id', 'date_of_purchase']
                                    }, {
                                        model: passageController.area,
                                        attributes: ['name']
                                    }],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageRepository.getPassage = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        return [4 /*yield*/, passageController.passage.findOne({
                                attributes: ['id', 'date', 'is_inside_the_area'],
                                include: [{
                                        model: passageController.ticket,
                                        attributes: ['id', 'date_of_purchase']
                                    }, {
                                        model: passageController.area,
                                        attributes: ['name']
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
    PassageRepository.getPassagesByTicketAndArea = function (ticket_id, area_id) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id', 'date', 'is_inside_the_area'],
                                include: [{
                                        model: passageController.ticket,
                                        required: true,
                                        where: {
                                            id: ticket_id
                                        }
                                    }, {
                                        model: passageController.area,
                                        required: true,
                                        where: {
                                            id: area_id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageRepository.getPassagesByTicket = function (ticket_id) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id', 'date', 'is_inside_the_area'],
                                include: [{
                                        model: passageController.ticket,
                                        required: true,
                                        where: {
                                            id: ticket_id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageRepository.getPassagesByTicketAndDate = function (ticket_id, date) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController, date_start;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _b.sent();
                        date_start = new Date(date);
                        date_start.setUTCHours(0, 0, 0, 0);
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id'],
                                where: {
                                    date: (_a = {},
                                        _a[sequelize_1.Op.gte] = date_start,
                                        _a[sequelize_1.Op.lte] = date,
                                        _a)
                                },
                                include: [{
                                        model: passageController.area,
                                        attributes: ['id'],
                                        required: true
                                    }, {
                                        model: passageController.ticket,
                                        attributes: ['id'],
                                        required: true,
                                        where: {
                                            id: ticket_id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    PassageRepository.updatePassage = function (id, date, is_inside_the_area) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController, passage, props_convert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        return [4 /*yield*/, PassageRepository.getPassage(id)];
                    case 2:
                        passage = _a.sent();
                        if (passage === undefined || (passage === null || passage === void 0 ? void 0 : passage.id) === undefined) {
                            return [2 /*return*/, null];
                        }
                        date = date || passage.date;
                        if (is_inside_the_area === undefined)
                            is_inside_the_area = passage.is_inside_the_area;
                        props_convert = JSON.parse(JSON.stringify({
                            date: date,
                            is_inside_the_area: is_inside_the_area
                        }));
                        return [4 /*yield*/, passageController.passage.update(props_convert, {
                                where: {
                                    id: passage.id
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, PassageRepository.getPassage(id)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageRepository.deletePassage = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController, Passage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        return [4 /*yield*/, passageController.passage.destroy({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, PassageRepository.getPassage(id)];
                    case 3:
                        Passage = _a.sent();
                        return [2 /*return*/, Passage === null];
                }
            });
        });
    };
    PassageRepository.getRealTimeStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var passageController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id'],
                                where: {
                                    is_inside_the_area: 1
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageRepository.getRealTimeStatsByArea = function (area_id) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id'],
                                where: {
                                    is_inside_the_area: 1
                                },
                                include: [{
                                        model: passageController.area,
                                        attributes: ['id'],
                                        required: true,
                                        where: {
                                            id: area_id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageRepository.getAreaStatsByDay = function (area_id, date) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController, date_start, date_end;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _b.sent();
                        date_start = new Date(date);
                        date_end = new Date(date);
                        date_start.setUTCHours(0, 0, 0, 0);
                        date_end.setUTCHours(23, 59, 59, 999);
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id'],
                                group: ['ticket_id'],
                                where: {
                                    date: (_a = {},
                                        _a[sequelize_1.Op.gte] = date_start,
                                        _a[sequelize_1.Op.lte] = date_end,
                                        _a)
                                },
                                include: [{
                                        model: passageController.area,
                                        attributes: ['id'],
                                        required: true,
                                        where: {
                                            id: area_id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    PassageRepository.getStatsByDay = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController, date_start, date_end;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _b.sent();
                        date_start = new Date(date);
                        date_end = new Date(date);
                        date_start.setUTCHours(0, 0, 0, 0);
                        date_end.setUTCHours(23, 59, 59, 999);
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id'],
                                group: ['ticket_id'],
                                where: {
                                    date: (_a = {},
                                        _a[sequelize_1.Op.gte] = date_start,
                                        _a[sequelize_1.Op.lte] = date_end,
                                        _a)
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    PassageRepository.getAreaStatsByWeek = function (area_id, week) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _b.sent();
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id'],
                                group: ['ticket_id'],
                                where: {
                                    date: (_a = {},
                                        _a[sequelize_1.Op.gte] = week.start_date,
                                        _a[sequelize_1.Op.lte] = week.end_date,
                                        _a)
                                },
                                include: [{
                                        model: passageController.area,
                                        attributes: ['id'],
                                        required: true,
                                        where: {
                                            id: area_id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    PassageRepository.getStatsByWeek = function (week) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _b.sent();
                        return [4 /*yield*/, passageController.passage.findAll({
                                attributes: ['id'],
                                group: ['ticket_id'],
                                where: {
                                    date: (_a = {},
                                        _a[sequelize_1.Op.gte] = week.start_date,
                                        _a[sequelize_1.Op.lte] = week.end_date,
                                        _a)
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    PassageRepository.fixDateType = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                date.setUTCHours(0, 0, 0, 0);
                date.setDate((date.getDate() + 1));
                date.setMonth((date.getMonth() - 1));
                return [2 /*return*/, date];
            });
        });
    };
    return PassageRepository;
}());
exports.PassageRepository = PassageRepository;
