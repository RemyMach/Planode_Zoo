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
exports.RaceFixture = void 0;
var models_1 = require("../../models");
var species_fixture_1 = require("./species.fixture");
var RaceFixture = /** @class */ (function () {
    function RaceFixture() {
    }
    RaceFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (RaceFixture.instance === undefined) {
                    RaceFixture.instance = new RaceFixture();
                }
                return [2 /*return*/, RaceFixture.instance];
            });
        });
    };
    ;
    RaceFixture.prototype.fillTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manager, speciesFixture, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _e.sent();
                        return [4 /*yield*/, species_fixture_1.SpeciesFixture.getInstance()];
                    case 2:
                        speciesFixture = _e.sent();
                        _a = this;
                        return [4 /*yield*/, manager.race.create({
                                breed: "python"
                            })];
                    case 3:
                        _a.race_python = _e.sent();
                        return [4 /*yield*/, this.race_python.setSpecies(speciesFixture.species_snake)];
                    case 4:
                        _e.sent();
                        _b = this;
                        return [4 /*yield*/, manager.race.create({
                                breed: "serval"
                            })];
                    case 5:
                        _b.race_serval = _e.sent();
                        return [4 /*yield*/, this.race_serval.setSpecies(speciesFixture.species_wild_cat)];
                    case 6:
                        _e.sent();
                        _c = this;
                        return [4 /*yield*/, manager.race.create({
                                breed: "ocelot"
                            })];
                    case 7:
                        _c.race_ocelot = _e.sent();
                        return [4 /*yield*/, this.race_ocelot.setSpecies(speciesFixture.species_wild_cat)];
                    case 8:
                        _e.sent();
                        _d = this;
                        return [4 /*yield*/, manager.race.create({
                                breed: "golden eagle"
                            })];
                    case 9:
                        _d.race_golden_eagle = _e.sent();
                        return [4 /*yield*/, this.race_golden_eagle.setSpecies(speciesFixture.species_eagle)];
                    case 10:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RaceFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.race.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.race.destroy({
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
    return RaceFixture;
}());
exports.RaceFixture = RaceFixture;
