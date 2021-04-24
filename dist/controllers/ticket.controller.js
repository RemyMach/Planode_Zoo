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
exports.TicketController = void 0;
var models_1 = require("../models");
var ticket_repository_1 = require("../repositories/ticket.repository");
var passage_controller_1 = require("./passage.controller");
var order_controller_1 = require("./order.controller");
var passage_repository_1 = require("../repositories/passage.repository");
var TicketController = /** @class */ (function () {
    function TicketController(Ticket, Pass) {
        this.ticket = Ticket;
        this.pass = Pass;
    }
    TicketController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ticket, pass;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(TicketController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), ticket = _a.ticket, pass = _a.pass;
                        TicketController.instance = new TicketController(ticket, pass);
                        _b.label = 2;
                    case 2: return [2 /*return*/, TicketController.instance];
                }
            });
        });
    };
    TicketController.prototype.getAllTicket = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = limit || 30;
                        offset = offset || 0;
                        return [4 /*yield*/, ticket_repository_1.TicketRepository.getAllTicket(offset, limit)];
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
    TicketController.prototype.createTicket = function (date_of_purchase, pass) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_repository_1.TicketRepository.fixDateType(date_of_purchase)];
                    case 1:
                        date_of_purchase = _a.sent();
                        return [4 /*yield*/, this.ticket.create({
                                date_of_purchase: date_of_purchase
                            })];
                    case 2:
                        ticket = _a.sent();
                        ticket.setPass(pass);
                        return [2 /*return*/, ticket];
                }
            });
        });
    };
    TicketController.prototype.updateTicket = function (id, date_of_purchase) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_repository_1.TicketRepository.updateTicket(id, date_of_purchase)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketController.prototype.deleteTicket = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_repository_1.TicketRepository.deleteTicket(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketController.prototype.ticketIsExpired = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var todayDate, json, expiredDate;
            return __generator(this, function (_a) {
                todayDate = new Date();
                todayDate.setHours(todayDate.getHours() + 2);
                json = JSON.parse(JSON.stringify(ticket));
                expiredDate = new Date(json.date_of_purchase);
                expiredDate.setDate(expiredDate.getDate() + json.Pass.number_of_days_of_validity);
                return [2 /*return*/, expiredDate <= todayDate];
            });
        });
    };
    TicketController.prototype.ticketHaveUsesLeft = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var passageController, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                    case 1:
                        passageController = _a.sent();
                        json = JSON.parse(JSON.stringify(ticket));
                        if (!(json.Pass.number_of_use_per_month !== -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, passageController.getNumberOfUsesThisMonth(ticket)];
                    case 2: return [2 /*return*/, (_a.sent()) < json.Pass.number_of_use_per_month];
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    TicketController.prototype.theAreaIsInTheGoodParcours = function (ticket, area) {
        return __awaiter(this, void 0, void 0, function () {
            var orderController, orders, _a, _b, _c, _d, area_id_authorized, position, i, passagesOfTheDay, i;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, order_controller_1.OrderController.getInstance()];
                    case 1:
                        orderController = _e.sent();
                        _b = (_a = JSON).parse;
                        _d = (_c = JSON).stringify;
                        return [4 /*yield*/, orderController.getTicketOrders(ticket)];
                    case 2:
                        orders = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                        position = 0;
                        if (orders.length === 0) {
                            return [2 /*return*/, false];
                        }
                        if (orders[0].position === -1) {
                            for (i = 0; i < orders.length; i++) {
                                if (orders[i].Area.id === area.id) {
                                    return [2 /*return*/, true];
                                }
                            }
                            console.log("not in the pool");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, passage_repository_1.PassageRepository.getPassagesByTicketAndDate(ticket.id, new Date())];
                    case 3:
                        passagesOfTheDay = _e.sent();
                        if (passagesOfTheDay !== null) {
                            position = passagesOfTheDay.length;
                        }
                        for (i = 0; i < orders.length; i++) {
                            console.log(orders[i].position);
                            console.log(position + 1);
                            if (orders[i].position === position + 1) {
                                area_id_authorized = orders[i].Area.id;
                            }
                        }
                        if (area_id_authorized === undefined) {
                            console.log("undefined");
                            return [2 /*return*/, false];
                        }
                        if (area_id_authorized !== area.id) {
                            console.log("different");
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return TicketController;
}());
exports.TicketController = TicketController;
