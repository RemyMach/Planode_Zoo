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
exports.TicketRepository = void 0;
var ticket_controller_1 = require("../controllers/ticket.controller");
var TicketRepository = /** @class */ (function () {
    function TicketRepository() {
    }
    TicketRepository.getAllTicket = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_controller_1.TicketController.getInstance()];
                    case 1:
                        ticketController = _a.sent();
                        return [4 /*yield*/, ticketController.ticket.findAll({
                                attributes: ['id', 'date_of_purchase'],
                                include: [{
                                        model: ticketController.pass,
                                        attributes: ['id', 'number_of_days_of_validity', 'number_of_use_per_month', 'is_night_pass']
                                    }],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketRepository.getTicket = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_controller_1.TicketController.getInstance()];
                    case 1:
                        ticketController = _a.sent();
                        return [4 /*yield*/, ticketController.ticket.findOne({
                                attributes: ['id', 'date_of_purchase'],
                                include: [{
                                        model: ticketController.pass,
                                        attributes: ['id', 'number_of_days_of_validity', 'number_of_use_per_month', 'is_night_pass']
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
    TicketRepository.searchTicketByPassAndDateOfPurchase = function (pass, date_of_purchase) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_controller_1.TicketController.getInstance()];
                    case 1:
                        ticketController = _a.sent();
                        return [4 /*yield*/, this.fixDateType(date_of_purchase)];
                    case 2:
                        date_of_purchase = _a.sent();
                        return [4 /*yield*/, ticketController.ticket.findOne({
                                where: {
                                    date_of_purchase: date_of_purchase
                                }
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketRepository.updateTicket = function (id, date_of_purchase) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketController, ticket, props_convert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_controller_1.TicketController.getInstance()];
                    case 1:
                        ticketController = _a.sent();
                        return [4 /*yield*/, TicketRepository.getTicket(id)];
                    case 2:
                        ticket = _a.sent();
                        if (ticket === undefined || (ticket === null || ticket === void 0 ? void 0 : ticket.id) === undefined) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.fixDateType(date_of_purchase)];
                    case 3:
                        date_of_purchase = _a.sent();
                        props_convert = JSON.parse(JSON.stringify({ date_of_purchase: date_of_purchase }));
                        return [4 /*yield*/, ticketController.ticket.update(props_convert, {
                                where: {
                                    id: ticket.id
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, TicketRepository.getTicket(id)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TicketRepository.deleteTicket = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketController, Ticket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ticket_controller_1.TicketController.getInstance()];
                    case 1:
                        ticketController = _a.sent();
                        return [4 /*yield*/, ticketController.ticket.destroy({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, TicketRepository.getTicket(id)];
                    case 3:
                        Ticket = _a.sent();
                        return [2 /*return*/, Ticket === null];
                }
            });
        });
    };
    TicketRepository.fixDateType = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                date.setUTCHours(0, 0, 0, 0);
                date.setDate((date.getDate() + 1));
                date.setMonth((date.getMonth() - 1));
                return [2 /*return*/, date];
            });
        });
    };
    return TicketRepository;
}());
exports.TicketRepository = TicketRepository;
