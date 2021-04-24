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
exports.SpeciesController = void 0;
var models_1 = require("../models");
var species_repository_1 = require("../repositories/species.repository");
var SpeciesController = /** @class */ (function () {
    function SpeciesController(animal, race, species) {
        this.animal = animal;
        this.race = race;
        this.species = species;
    }
    SpeciesController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, animal, race, species;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(SpeciesController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), animal = _a.animal, race = _a.race, species = _a.species;
                        SpeciesController.instance = new SpeciesController(animal, race, species);
                        _b.label = 2;
                    case 2: return [2 /*return*/, SpeciesController.instance];
                }
            });
        });
    };
    SpeciesController.prototype.createSpecies = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, species_repository_1.SpeciesRepository.createSpecies(props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SpeciesController.prototype.getAll = function (offset, limit, details) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = limit || 30;
                        offset = offset || 0;
                        if (!details) return [3 /*break*/, 2];
                        return [4 /*yield*/, species_repository_1.SpeciesRepository.getAllSpeciesDetails(offset, limit)];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, species_repository_1.SpeciesRepository.getAllSpecies(offset, limit)];
                    case 3:
                        res = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (res.length > 0) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    SpeciesController.prototype.getSpeciesById = function (id, details) {
        return __awaiter(this, void 0, void 0, function () {
            var species;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!details) return [3 /*break*/, 2];
                        return [4 /*yield*/, species_repository_1.SpeciesRepository.getSpeciesDetailsById(id)];
                    case 1:
                        species = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, species_repository_1.SpeciesRepository.getSpeciesById(id)];
                    case 3:
                        species = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (species !== null) {
                            return [2 /*return*/, species];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    SpeciesController.prototype.getSpeciesByName = function (name, details) {
        return __awaiter(this, void 0, void 0, function () {
            var species;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!details) return [3 /*break*/, 2];
                        return [4 /*yield*/, species_repository_1.SpeciesRepository.getSpeciesDetailsByName(name)];
                    case 1:
                        species = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, species_repository_1.SpeciesRepository.getSpeciesByName(name)];
                    case 3:
                        species = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (species !== null) {
                            return [2 /*return*/, species];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    SpeciesController.prototype.updateSpecies = function (id, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, species_repository_1.SpeciesRepository.updateSpecies(id, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SpeciesController.prototype.deleteSpecies = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, species_repository_1.SpeciesRepository.deleteSpecies(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SpeciesController;
}());
exports.SpeciesController = SpeciesController;
