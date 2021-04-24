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
exports.MaintainFixture = void 0;
var models_1 = require("../../models");
var area_fixture_1 = require("./area.fixture");
var user_fixture_1 = require("./user.fixture");
var MaintainFixture = /** @class */ (function () {
    function MaintainFixture() {
    }
    MaintainFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (MaintainFixture.instance === undefined) {
                    MaintainFixture.instance = new MaintainFixture();
                }
                return [2 /*return*/, MaintainFixture.instance];
            });
        });
    };
    ;
    MaintainFixture.prototype.fillTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manager, areaFixture, userFixture, start_date_savana, end_date_savana, _a, start_date_aviary, end_date_aviary, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _c.sent();
                        return [4 /*yield*/, area_fixture_1.AreaFixture.getInstance()];
                    case 2:
                        areaFixture = _c.sent();
                        return [4 /*yield*/, user_fixture_1.UserFixture.getInstance()];
                    case 3:
                        userFixture = _c.sent();
                        start_date_savana = this.convertStringDateInDateFormat("05/17/2021");
                        end_date_savana = this.convertStringDateInDateFormat("05/23/2021");
                        _a = this;
                        return [4 /*yield*/, manager.maintain.create({
                                start_date: start_date_savana,
                                end_date: end_date_savana
                            })];
                    case 4:
                        _a.maintain_area_savanna = _c.sent();
                        return [4 /*yield*/, this.maintain_area_savanna.setArea(areaFixture.area_savanna)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, this.maintain_area_savanna.addUser(userFixture.user_normal)];
                    case 6:
                        _c.sent();
                        start_date_aviary = this.convertStringDateInDateFormat("05/17/2021");
                        end_date_aviary = this.convertStringDateInDateFormat("05/23/2021");
                        _b = this;
                        return [4 /*yield*/, manager.maintain.create({
                                start_date: start_date_aviary,
                                end_date: end_date_aviary
                            })];
                    case 7:
                        _b.maintain_area_aviary = _c.sent();
                        return [4 /*yield*/, this.maintain_area_aviary.setArea(areaFixture.area_aviary)];
                    case 8:
                        _c.sent();
                        return [4 /*yield*/, this.maintain_area_aviary.addUser(userFixture.user_normal_healer)];
                    case 9:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.maintain.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.maintain.destroy({
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
    MaintainFixture.prototype.convertStringDateInDateFormat = function (date) {
        try {
            var new_date = new Date(date);
            new_date.setUTCHours(0, 0, 0, 0);
            new_date.setDate((new_date.getDate() + 1));
            return new_date;
        }
        catch (_a) {
            return new Date();
        }
    };
    return MaintainFixture;
}());
exports.MaintainFixture = MaintainFixture;
