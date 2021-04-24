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
exports.PassageController = void 0;
var sequelize_1 = require("sequelize");
var models_1 = require("../models");
var passage_repository_1 = require("../repositories/passage.repository");
var ticket_controller_1 = require("./ticket.controller");
var area_controller_1 = require("./area.controller");
var night_opening_controller_1 = require("./night_opening.controller");
var PassageController = /** @class */ (function () {
    function PassageController(passage, area, ticket) {
        this.passage = passage;
        this.area = area;
        this.ticket = ticket;
    }
    PassageController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, passage, area, ticket;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(PassageController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), passage = _a.passage, area = _a.area, ticket = _a.ticket;
                        PassageController.instance = new PassageController(passage, area, ticket);
                        _b.label = 2;
                    case 2: return [2 /*return*/, PassageController.instance];
                }
            });
        });
    };
    PassageController.prototype.getAllPassage = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = limit || 30;
                        offset = offset || 0;
                        return [4 /*yield*/, passage_repository_1.PassageRepository.getAllPassage(offset, limit)];
                    case 1:
                        res = _a.sent();
                        if (res.length > 0) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    PassageController.prototype.createPassage = function (date, ticket, area) {
        return __awaiter(this, void 0, void 0, function () {
            var passage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.passage.create({
                            date: date,
                            is_inside_the_area: true
                        })];
                    case 1:
                        passage = _a.sent();
                        passage.setTicket(ticket);
                        passage.setArea(area);
                        return [2 /*return*/, passage];
                }
            });
        });
    };
    PassageController.prototype.updatePassage = function (id, date, is_inside_the_area) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_repository_1.PassageRepository.updatePassage(id, date, is_inside_the_area)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageController.prototype.deletePassage = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_repository_1.PassageRepository.deletePassage(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageController.prototype.userEnter = function (ticket, area) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = JSON.parse(JSON.stringify(ticket));
                        if (!!json.Pass.is_night_pass) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userEnterOnDay(ticket, area)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.userEnterOnNight(ticket, area)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageController.prototype.userEnterOnDay = function (ticket, area) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketController, areaController, actual_date_time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_controller_1.TicketController.getInstance()];
                    case 1:
                        ticketController = _a.sent();
                        return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                    case 2:
                        areaController = _a.sent();
                        actual_date_time = new Date();
                        actual_date_time.setHours(actual_date_time.getHours() + 2);
                        return [4 /*yield*/, ticketController.ticketIsExpired(ticket)];
                    case 3:
                        if (_a.sent()) {
                            console.log("expired");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.userIsAlreadyInsideAnArea(ticket)];
                    case 4:
                        if (_a.sent()) {
                            console.log("no");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, areaController.areaIsOpen(area)];
                    case 5:
                        if (!(_a.sent())) {
                            console.log("closed");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, ticketController.theAreaIsInTheGoodParcours(ticket, area)];
                    case 6:
                        if (!(_a.sent())) {
                            console.log("wrong");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, ticketController.ticketHaveUsesLeft(ticket)];
                    case 7:
                        if (!(_a.sent())) {
                            console.log("no use left this month");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.createPassage(actual_date_time, ticket, area)];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageController.prototype.userEnterOnNight = function (ticket, area) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketController, nightOpeningController, actual_date_time, lastDayDateTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_controller_1.TicketController.getInstance()];
                    case 1:
                        ticketController = _a.sent();
                        return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                    case 2:
                        nightOpeningController = _a.sent();
                        actual_date_time = new Date();
                        actual_date_time.setHours(actual_date_time.getHours() + 2);
                        return [4 /*yield*/, ticketController.ticketIsExpired(ticket)];
                    case 3:
                        if (_a.sent()) {
                            console.log("expired");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.userIsAlreadyInsideAnArea(ticket)];
                    case 4:
                        if (_a.sent()) {
                            console.log("no");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, nightOpeningController.zooIsOpen(actual_date_time)];
                    case 5:
                        if (!(_a.sent())) {
                            console.log("closed");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, ticketController.theAreaIsInTheGoodParcours(ticket, area)];
                    case 6:
                        if (!(_a.sent())) {
                            console.log("wrong");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, PassageController.getLastDayDateTime(actual_date_time)];
                    case 7:
                        lastDayDateTime = _a.sent();
                        return [4 /*yield*/, this.getNumberOfUsesBeforeDate(ticket, lastDayDateTime)];
                    case 8:
                        if ((_a.sent()) !== 0) {
                            console.log("no use left");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.createPassage(actual_date_time, ticket, area)];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PassageController.getLastDayDateTime = function (actual_date_time) {
        return __awaiter(this, void 0, void 0, function () {
            var date;
            return __generator(this, function (_a) {
                date = new Date();
                date.setUTCHours(8, 0, 0);
                if (actual_date_time.getHours() < 8) {
                    date.setDate(date.getDate() - 1);
                }
                return [2 /*return*/, date];
            });
        });
    };
    PassageController.prototype.userLeave = function (ticket, area) {
        return __awaiter(this, void 0, void 0, function () {
            var passages, i, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_repository_1.PassageRepository.getPassagesByTicketAndArea(ticket.id, area.id)];
                    case 1:
                        passages = _a.sent();
                        if (passages === null) {
                            return [2 /*return*/, false];
                        }
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < passages.length)) return [3 /*break*/, 5];
                        json = JSON.parse(JSON.stringify(passages[i]));
                        if (!(json.is_inside_the_area === 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, passage_repository_1.PassageRepository.updatePassage(json.id, json.date, false)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    PassageController.prototype.userIsAlreadyInsideAnArea = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var passages, i, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_repository_1.PassageRepository.getPassagesByTicket(ticket.id)];
                    case 1:
                        passages = _a.sent();
                        if (passages === null) {
                            return [2 /*return*/, false];
                        }
                        for (i = 0; i < passages.length; i++) {
                            json = JSON.parse(JSON.stringify(passages[i]));
                            if (json.is_inside_the_area === 1) {
                                return [2 /*return*/, true];
                            }
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    PassageController.prototype.getNumberOfUsesThisMonth = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var today, firstDayOfTodayMonth, passages;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        today = new Date();
                        today.setHours(today.getHours() + 2);
                        firstDayOfTodayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                        today.setDate(today.getDate() - 1);
                        return [4 /*yield*/, this.passage.findAll({
                                attributes: ['date'],
                                group: ['date'],
                                where: {
                                    date: (_a = {},
                                        _a[sequelize_1.Op.lte] = today,
                                        _a[sequelize_1.Op.gte] = firstDayOfTodayMonth,
                                        _a)
                                },
                                include: [{
                                        model: this.ticket,
                                        required: true,
                                        where: {
                                            id: ticket.id
                                        }
                                    }]
                            })];
                    case 1:
                        passages = _b.sent();
                        return [2 /*return*/, passages.length];
                }
            });
        });
    };
    PassageController.prototype.getNumberOfUsesBeforeDate = function (ticket, date) {
        return __awaiter(this, void 0, void 0, function () {
            var passages;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.passage.findAll({
                            attributes: ['date'],
                            group: ['date'],
                            where: {
                                date: (_a = {},
                                    _a[sequelize_1.Op.lt] = date,
                                    _a)
                            },
                            include: [{
                                    model: this.ticket,
                                    required: true,
                                    where: {
                                        id: ticket.id
                                    }
                                }]
                        })];
                    case 1:
                        passages = _b.sent();
                        return [2 /*return*/, passages.length];
                }
            });
        });
    };
    return PassageController;
}());
exports.PassageController = PassageController;
