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
exports.locationRouter = void 0;
var express_1 = __importDefault(require("express"));
var location_controller_1 = require("../controllers/location.controller");
var area_controller_1 = require("../controllers/area.controller");
var animal_controller_1 = require("../controllers/animal.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var locationRouter = express_1.default.Router();
exports.locationRouter = locationRouter;
locationRouter.get("/all", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, details, locationController, locations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    details = req.query.details === "true";
                    return [4 /*yield*/, location_controller_1.LocationController.getInstance()];
                case 1:
                    locationController = _a.sent();
                    return [4 /*yield*/, locationController.getAll(offset, limit, details)];
                case 2:
                    locations = _a.sent();
                    if (locations !== null) {
                        res.status(200);
                        res.json(locations);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
locationRouter.get("/:id", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var details, id, locationController, location;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    details = req.query.details === "true";
                    id = Number(req.params.id);
                    if (id === undefined || isNaN(id)) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, location_controller_1.LocationController.getInstance()];
                case 1:
                    locationController = _a.sent();
                    return [4 /*yield*/, locationController.getLocationById(id, details)];
                case 2:
                    location = _a.sent();
                    if (location !== null) {
                        res.status(200);
                        res.json(location);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
locationRouter.put("/:id", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var entry_date, exit_date, id, locationController, location;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entry_date = req.body.entry_date;
                    exit_date = req.body.exit_date;
                    if (entry_date === undefined && exit_date === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, location_controller_1.LocationController.getInstance()];
                case 1:
                    locationController = _a.sent();
                    return [4 /*yield*/, locationController.updateLocation(Number(id), {
                            entry_date: entry_date,
                            exit_date: exit_date
                        })];
                case 2:
                    location = _a.sent();
                    if (location !== null) {
                        res.status(200);
                        res.json(location);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
locationRouter.post("/", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var entryDate, exitDate, areaId, animalId, areaController, area, animalController, animal, locationController, location;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entryDate = req.body.entry_date;
                    exitDate = req.body.exit_date || null;
                    areaId = req.body.area_id;
                    animalId = req.body.animal_id || null;
                    if (entryDate === undefined || areaId === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 1:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getArea(areaId, false)];
                case 2:
                    area = _a.sent();
                    if (area === null) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    if (!(animalId !== null)) return [3 /*break*/, 5];
                    return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                case 3:
                    animalController = _a.sent();
                    return [4 /*yield*/, animalController.getAnimalById(animalId, false)];
                case 4:
                    animal = _a.sent();
                    if (animal === null) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    _a.label = 5;
                case 5: return [4 /*yield*/, location_controller_1.LocationController.getInstance()];
                case 6:
                    locationController = _a.sent();
                    return [4 /*yield*/, locationController.createLocation({
                            entry_date: entryDate,
                            exit_date: exitDate
                        })];
                case 7:
                    location = _a.sent();
                    if (!(location !== null)) return [3 /*break*/, 11];
                    return [4 /*yield*/, location.setArea(areaId)];
                case 8:
                    _a.sent();
                    if (!(animalId !== null)) return [3 /*break*/, 10];
                    return [4 /*yield*/, location.setAnimal(animalId)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    res.status(200);
                    res.json(location);
                    return [3 /*break*/, 12];
                case 11:
                    res.status(500).end();
                    _a.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
});
locationRouter.delete("/:id", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, locationController, location, isLocationDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, location_controller_1.LocationController.getInstance()];
                case 1:
                    locationController = _a.sent();
                    return [4 /*yield*/, locationController.getLocationById(Number(id), false)];
                case 2:
                    location = _a.sent();
                    if (location === null) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, locationController.deleteLocation(Number(id))];
                case 3:
                    isLocationDeleted = _a.sent();
                    if (isLocationDeleted) {
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
