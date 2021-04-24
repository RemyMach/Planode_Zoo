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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceRouter = void 0;
var express_1 = __importDefault(require("express"));
var race_controller_1 = require("../controllers/race.controller");
var species_controller_1 = require("../controllers/species.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var raceRouter = express_1.default.Router();
exports.raceRouter = raceRouter;
raceRouter.get("/all", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, details, raceController, races;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    details = req.query.details === "true";
                    return [4 /*yield*/, race_controller_1.RaceController.getInstance()];
                case 1:
                    raceController = _a.sent();
                    return [4 /*yield*/, raceController.getAll(offset, limit, details)];
                case 2:
                    races = _a.sent();
                    if (races !== null) {
                        res.status(200);
                        res.json(races);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
raceRouter.get("/:scrap", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var details, scrap, id, breed, raceController, race;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    details = req.query.details === "true";
                    scrap = req.params.scrap;
                    if (scrap === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    id = isNaN(Number(scrap)) ? undefined : Number(scrap);
                    breed = scrap;
                    if (id === undefined && breed === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, race_controller_1.RaceController.getInstance()];
                case 1:
                    raceController = _a.sent();
                    race = null;
                    if (!(id !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, raceController.getRaceById(id, details)];
                case 2:
                    race = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!(breed !== undefined)) return [3 /*break*/, 5];
                    return [4 /*yield*/, raceController.getRaceByBreed(breed.toString(), details)];
                case 4:
                    race = _a.sent();
                    _a.label = 5;
                case 5:
                    if (race !== null) {
                        res.status(200);
                        res.json(race);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
raceRouter.put("/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var breed, id, raceController, race;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    breed = req.body.breed;
                    if (breed === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, race_controller_1.RaceController.getInstance()];
                case 1:
                    raceController = _a.sent();
                    return [4 /*yield*/, raceController.updateRace(Number(id), {
                            breed: breed
                        })];
                case 2:
                    race = _a.sent();
                    if (race !== null) {
                        res.status(200);
                        res.json(race);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
raceRouter.post("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var breed, speciesId, speciesController, species, raceController, race;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    breed = req.body.breed;
                    speciesId = req.body.species_id;
                    if (breed === undefined || speciesId === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, species_controller_1.SpeciesController.getInstance()];
                case 1:
                    speciesController = _a.sent();
                    return [4 /*yield*/, speciesController.getSpeciesById(speciesId, false)];
                case 2:
                    species = _a.sent();
                    if (species === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, race_controller_1.RaceController.getInstance()];
                case 3:
                    raceController = _a.sent();
                    return [4 /*yield*/, raceController.createRace({
                            breed: breed
                        })];
                case 4:
                    race = _a.sent();
                    if (!(race !== null)) return [3 /*break*/, 6];
                    return [4 /*yield*/, race.setSpecies(speciesId)];
                case 5:
                    _a.sent();
                    res.status(200);
                    res.json(race);
                    return [3 /*break*/, 7];
                case 6:
                    res.status(500).end();
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
});
raceRouter.delete("/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, raceController, race, isRaceDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, race_controller_1.RaceController.getInstance()];
                case 1:
                    raceController = _a.sent();
                    return [4 /*yield*/, raceController.getRaceById(Number(id), false)];
                case 2:
                    race = _a.sent();
                    if (race === null) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, raceController.deleteRace(Number(id))];
                case 3:
                    isRaceDeleted = _a.sent();
                    if (isRaceDeleted) {
                        res.status(200).end();
                    }
                    else {
                        res.status(500).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
