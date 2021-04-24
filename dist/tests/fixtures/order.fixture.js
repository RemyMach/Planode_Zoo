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
exports.OrderFixture = void 0;
var models_1 = require("../../models");
var pass_fixture_1 = require("./pass.fixture");
var area_fixture_1 = require("./area.fixture");
var OrderFixture = /** @class */ (function () {
    function OrderFixture() {
    }
    OrderFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (OrderFixture.instance === undefined) {
                    OrderFixture.instance = new OrderFixture();
                }
                return [2 /*return*/, OrderFixture.instance];
            });
        });
    };
    ;
    OrderFixture.prototype.fillTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manager, passFixture, areaFixture, _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _j.sent();
                        return [4 /*yield*/, pass_fixture_1.PassFixture.getInstance()];
                    case 2:
                        passFixture = _j.sent();
                        return [4 /*yield*/, area_fixture_1.AreaFixture.getInstance()];
                    case 3:
                        areaFixture = _j.sent();
                        _a = this;
                        return [4 /*yield*/, manager.order.create({
                                position: 1
                            })];
                    case 4:
                        _a.order_1_for_escape_game_pass = _j.sent();
                        this.order_1_for_escape_game_pass.setPass(passFixture.escape_game_pass);
                        this.order_1_for_escape_game_pass.setArea(areaFixture.area_aviary);
                        _b = this;
                        return [4 /*yield*/, manager.order.create({
                                position: 2
                            })];
                    case 5:
                        _b.order_2_for_escape_game_pass = _j.sent();
                        this.order_2_for_escape_game_pass.setPass(passFixture.escape_game_pass);
                        this.order_2_for_escape_game_pass.setArea(areaFixture.area_savanna);
                        _c = this;
                        return [4 /*yield*/, manager.order.create({
                                position: -1
                            })];
                    case 6:
                        _c.order_1_for_year_pass = _j.sent();
                        this.order_1_for_year_pass.setPass(passFixture.year_pass);
                        this.order_1_for_year_pass.setArea(areaFixture.area_aviary);
                        _d = this;
                        return [4 /*yield*/, manager.order.create({
                                position: -1
                            })];
                    case 7:
                        _d.order_2_for_year_pass = _j.sent();
                        this.order_2_for_year_pass.setPass(passFixture.year_pass);
                        this.order_2_for_year_pass.setArea(areaFixture.area_savanna);
                        _e = this;
                        return [4 /*yield*/, manager.order.create({
                                position: -1
                            })];
                    case 8:
                        _e.order_1_for_one_day_per_month_pass = _j.sent();
                        this.order_1_for_one_day_per_month_pass.setPass(passFixture.one_day_per_month_pass);
                        this.order_1_for_one_day_per_month_pass.setArea(areaFixture.area_aviary);
                        _f = this;
                        return [4 /*yield*/, manager.order.create({
                                position: -1
                            })];
                    case 9:
                        _f.order_2_for_one_day_per_month_pass = _j.sent();
                        this.order_2_for_one_day_per_month_pass.setPass(passFixture.one_day_per_month_pass);
                        this.order_2_for_one_day_per_month_pass.setArea(areaFixture.area_savanna);
                        _g = this;
                        return [4 /*yield*/, manager.order.create({
                                position: -1
                            })];
                    case 10:
                        _g.order_1_for_night_pass = _j.sent();
                        this.order_1_for_night_pass.setPass(passFixture.night_pass);
                        this.order_1_for_night_pass.setArea(areaFixture.area_aviary);
                        _h = this;
                        return [4 /*yield*/, manager.order.create({
                                position: -1
                            })];
                    case 11:
                        _h.order_2_for_night_pass = _j.sent();
                        this.order_2_for_night_pass.setPass(passFixture.night_pass);
                        this.order_2_for_night_pass.setArea(areaFixture.area_savanna);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.order.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.order.destroy({
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
    return OrderFixture;
}());
exports.OrderFixture = OrderFixture;
