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
exports.ConditionController = void 0;
var models_1 = require("../models");
var condition_repository_1 = require("../repositories/condition.repository");
var ConditionController = /** @class */ (function () {
    function ConditionController(area, condition, status) {
        this.area = area;
        this.condition = condition;
        this.status = status;
    }
    ConditionController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, area, condition, status_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(ConditionController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), area = _a.area, condition = _a.condition, status_1 = _a.status;
                        ConditionController.instance = new ConditionController(area, condition, status_1);
                        _b.label = 2;
                    case 2: return [2 /*return*/, ConditionController.instance];
                }
            });
        });
    };
    ConditionController.prototype.getAllConditions = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = limit || 30;
                        offset = offset || 0;
                        return [4 /*yield*/, condition_repository_1.ConditionRepository.getAllConditions(offset, limit)];
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
    ConditionController.prototype.addStatusToArea = function (area, status, date) {
        return __awaiter(this, void 0, void 0, function () {
            var condition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.condition.create({ date: date })];
                    case 1:
                        condition = _a.sent();
                        condition.setArea(area);
                        condition.setStatus(status);
                        return [2 /*return*/, condition];
                }
            });
        });
    };
    ConditionController.prototype.updateCondition = function (id, date) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, condition_repository_1.ConditionRepository.updateCondition(id, date)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConditionController.prototype.deleteCondition = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, condition_repository_1.ConditionRepository.deleteCondition(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConditionController.prototype.getActualAreaStatus = function (area_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, condition_repository_1.ConditionRepository.getActualAreaStatus(area_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ConditionController;
}());
exports.ConditionController = ConditionController;
