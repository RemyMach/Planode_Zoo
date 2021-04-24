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
exports.AnimalFixture = void 0;
var models_1 = require("../../models");
var race_fixture_1 = require("./race.fixture");
var healthcare_fixture_1 = require("./healthcare.fixture");
var AnimalFixture = /** @class */ (function () {
    function AnimalFixture() {
    }
    AnimalFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (AnimalFixture.instance === undefined) {
                    AnimalFixture.instance = new AnimalFixture();
                }
                return [2 /*return*/, AnimalFixture.instance];
            });
        });
    };
    ;
    AnimalFixture.prototype.fillTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager, raceFixture, healthcareFixture, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _f.sent();
                        return [4 /*yield*/, race_fixture_1.RaceFixture.getInstance()];
                    case 2:
                        raceFixture = _f.sent();
                        return [4 /*yield*/, healthcare_fixture_1.HealthcareFixture.getInstance()];
                    case 3:
                        healthcareFixture = _f.sent();
                        _b = this;
                        return [4 /*yield*/, manager.animal.create({
                                name: "Windows is better than mac",
                                birthdate: new Date("1991-01-19"),
                                height: 5,
                                weight: 800
                            })];
                    case 4:
                        _b.animal_windows_is_better = _f.sent();
                        return [4 /*yield*/, this.animal_windows_is_better.setRace(raceFixture.race_python)];
                    case 5:
                        _f.sent();
                        return [4 /*yield*/, this.animal_windows_is_better.addHealthcare(healthcareFixture.healthcare_wound)];
                    case 6:
                        _f.sent();
                        _c = this;
                        return [4 /*yield*/, manager.animal.create({
                                name: "JAVA",
                                birthdate: new Date("1995-05-22"),
                                height: 60,
                                weight: 12600
                            })];
                    case 7:
                        _c.animal_java = _f.sent();
                        return [4 /*yield*/, ((_a = this.animal_java) === null || _a === void 0 ? void 0 : _a.setRace(raceFixture.race_serval))];
                    case 8:
                        _f.sent();
                        _d = this;
                        return [4 /*yield*/, manager.animal.create({
                                name: "Dwight D. EISENHOWER",
                                birthdate: new Date("2002-02-02"),
                                height: 85,
                                weight: 20900
                            })];
                    case 9:
                        _d.animal_dwight = _f.sent();
                        return [4 /*yield*/, this.animal_dwight.setRace(raceFixture.race_ocelot)];
                    case 10:
                        _f.sent();
                        return [4 /*yield*/, this.animal_dwight.addHealthcare(healthcareFixture.healthcare_diarrhea)];
                    case 11:
                        _f.sent();
                        _e = this;
                        return [4 /*yield*/, manager.animal.create({
                                name: "Wilhelm Hansen",
                                birthdate: new Date("2015-05-10"),
                                height: 50,
                                weight: 8300
                            })];
                    case 12:
                        _e.animal_wilhelm = _f.sent();
                        return [4 /*yield*/, this.animal_wilhelm.setRace(raceFixture.race_golden_eagle)];
                    case 13:
                        _f.sent();
                        return [4 /*yield*/, this.animal_wilhelm.addHealthcare(healthcareFixture.healthcare_spanish_flu)];
                    case 14:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnimalFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.animal.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.animal.destroy({
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
    return AnimalFixture;
}());
exports.AnimalFixture = AnimalFixture;
