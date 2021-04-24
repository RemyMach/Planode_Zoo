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
exports.TicketFixture = void 0;
var models_1 = require("../../models");
var pass_fixture_1 = require("./pass.fixture");
var TicketFixture = /** @class */ (function () {
    function TicketFixture() {
    }
    TicketFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (TicketFixture.instance === undefined) {
                    TicketFixture.instance = new TicketFixture();
                }
                return [2 /*return*/, TicketFixture.instance];
            });
        });
    };
    ;
    TicketFixture.prototype.fillTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manager, passFixture, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _l.sent();
                        return [4 /*yield*/, pass_fixture_1.PassFixture.getInstance()];
                    case 2:
                        passFixture = _l.sent();
                        _a = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 3:
                        _a.good_ticket = _l.sent();
                        this.good_ticket.setPass(passFixture.year_pass);
                        _b = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 4:
                        _b.good_parcours_ticket = _l.sent();
                        this.good_parcours_ticket.setPass(passFixture.escape_game_pass);
                        _c = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2019, 3, 1)
                            })];
                    case 5:
                        _c.expired_ticket = _l.sent();
                        this.expired_ticket.setPass(passFixture.day_pass);
                        _d = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 6:
                        _d.already_inside_area_ticket = _l.sent();
                        this.already_inside_area_ticket.setPass(passFixture.year_pass);
                        _e = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 7:
                        _e.area_closed_ticket = _l.sent();
                        this.area_closed_ticket.setPass(passFixture.year_pass);
                        _f = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 8:
                        _f.wrong_area_ticket = _l.sent();
                        this.wrong_area_ticket.setPass(passFixture.no_area_pass);
                        _g = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 9:
                        _g.no_use_left_ticket = _l.sent();
                        this.no_use_left_ticket.setPass(passFixture.one_day_per_month_pass);
                        _h = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 10:
                        _h.good_night_ticket = _l.sent();
                        this.good_night_ticket.setPass(passFixture.night_pass);
                        _j = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 11:
                        _j.zoo_closed_ticket = _l.sent();
                        this.zoo_closed_ticket.setPass(passFixture.night_pass);
                        _k = this;
                        return [4 /*yield*/, manager.ticket.create({
                                date_of_purchase: new Date(2021, 3, 1)
                            })];
                    case 12:
                        _k.already_used_ticket = _l.sent();
                        this.already_used_ticket.setPass(passFixture.night_pass);
                        return [2 /*return*/];
                }
            });
        });
    };
    TicketFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.ticket.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.ticket.destroy({
                                truncate: true,
                                force: true
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TicketFixture;
}());
exports.TicketFixture = TicketFixture;
