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
exports.WeekRepository = void 0;
var week_controller_1 = require("../controllers/week.controller");
var WeekRepository = /** @class */ (function () {
    function WeekRepository() {
    }
    WeekRepository.addAYearSinceTheLastWeekinTheDB = function (table_of_week) {
        return __awaiter(this, void 0, void 0, function () {
            var weekController, count_before, count_after;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, week_controller_1.WeekController.getInstance()];
                    case 1:
                        weekController = _a.sent();
                        return [4 /*yield*/, weekController.week.count()];
                    case 2:
                        count_before = _a.sent();
                        return [4 /*yield*/, weekController.week.bulkCreate(table_of_week)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, weekController.week.count()];
                    case 4:
                        count_after = _a.sent();
                        if (count_after === count_before + table_of_week.length) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    WeekRepository.getTheLastWeekInTheDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var weekController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, week_controller_1.WeekController.getInstance()];
                    case 1:
                        weekController = _a.sent();
                        return [4 /*yield*/, weekController.week.max('end_date')];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WeekRepository.getWeekByTheStartDate = function (start_date) {
        return __awaiter(this, void 0, void 0, function () {
            var weekController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, week_controller_1.WeekController.getInstance()];
                    case 1:
                        weekController = _a.sent();
                        console.log(start_date);
                        return [4 /*yield*/, weekController.week.findOne({
                                where: {
                                    start_date: start_date
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WeekRepository.getWeekById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var weekController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, week_controller_1.WeekController.getInstance()];
                    case 1:
                        weekController = _a.sent();
                        return [4 /*yield*/, weekController.week.findOne({
                                where: {
                                    id: id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return WeekRepository;
}());
exports.WeekRepository = WeekRepository;
