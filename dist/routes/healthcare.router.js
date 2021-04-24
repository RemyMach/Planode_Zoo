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
exports.healthcareRouter = void 0;
var express_1 = __importDefault(require("express"));
var healthcare_controller_1 = require("../controllers/healthcare.controller");
var animal_controller_1 = require("../controllers/animal.controller");
var user_middleware_1 = require("../middlewares/user.middleware");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var healthcareRouter = express_1.default.Router();
exports.healthcareRouter = healthcareRouter;
healthcareRouter.get("/all", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, details, healthcareController, healthcare;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    details = req.query.details === "true";
                    return [4 /*yield*/, healthcare_controller_1.HealthcareController.getInstance()];
                case 1:
                    healthcareController = _a.sent();
                    return [4 /*yield*/, healthcareController.getAll(offset, limit, details)];
                case 2:
                    healthcare = _a.sent();
                    if (healthcare !== null) {
                        res.status(200);
                        res.json(healthcare);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
healthcareRouter.get("/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var details, id, healthcareController, healthcare;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    details = req.query.details === "true";
                    id = Number(req.params.id);
                    if (id === undefined || isNaN(id)) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, healthcare_controller_1.HealthcareController.getInstance()];
                case 1:
                    healthcareController = _a.sent();
                    return [4 /*yield*/, healthcareController.getHealthcareById(id, details)];
                case 2:
                    healthcare = _a.sent();
                    if (healthcare !== null) {
                        res.status(200);
                        res.json(healthcare);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
healthcareRouter.put("/:id", user_middleware_1.veterinaryMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var date, name, notes, cost, success, id, healthcareController, healthcare;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = new Date(Number(req.body.date));
                    name = req.body.name;
                    notes = req.body.notes;
                    cost = Number(req.body.cost);
                    success = req.body.success === "true";
                    if (date === undefined && name === undefined && notes === undefined && cost === undefined && success === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, healthcare_controller_1.HealthcareController.getInstance()];
                case 1:
                    healthcareController = _a.sent();
                    return [4 /*yield*/, healthcareController.updateHealthcare(Number(id), {
                            date: date,
                            name: name,
                            notes: notes,
                            cost: cost,
                            success: success
                        })];
                case 2:
                    healthcare = _a.sent();
                    if (healthcare !== null) {
                        res.status(200);
                        res.json(healthcare);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
healthcareRouter.post("/", user_middleware_1.veterinaryMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var date, name, notes, cost, success, animalId, animalController, animal, healthcareController, healthcare;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = req.body.date;
                    name = req.body.name;
                    notes = req.body.notes;
                    cost = req.body.cost;
                    success = req.body.success;
                    animalId = req.body.animal_id;
                    if (date === undefined || name === undefined || notes === undefined || cost === undefined || success === undefined || animalId === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                case 1:
                    animalController = _a.sent();
                    return [4 /*yield*/, animalController.getAnimalById(animalId, false)];
                case 2:
                    animal = _a.sent();
                    if (animal === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, healthcare_controller_1.HealthcareController.getInstance()];
                case 3:
                    healthcareController = _a.sent();
                    return [4 /*yield*/, healthcareController.createHealthcare({
                            date: date,
                            name: name,
                            notes: notes,
                            cost: cost,
                            success: success
                        })];
                case 4:
                    healthcare = _a.sent();
                    if (!(healthcare !== null)) return [3 /*break*/, 6];
                    return [4 /*yield*/, animal.addHealthcare(healthcare)];
                case 5:
                    _a.sent();
                    res.status(200);
                    res.json(healthcare);
                    return [3 /*break*/, 7];
                case 6:
                    res.status(500).end();
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
});
healthcareRouter.delete("/:id", user_middleware_1.veterinaryMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, healthcareController, healthcare, isHealthcareDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, healthcare_controller_1.HealthcareController.getInstance()];
                case 1:
                    healthcareController = _a.sent();
                    return [4 /*yield*/, healthcareController.getHealthcareById(Number(id), false)];
                case 2:
                    healthcare = _a.sent();
                    if (healthcare === null) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, healthcareController.deleteHealthcare(Number(id))];
                case 3:
                    isHealthcareDeleted = _a.sent();
                    if (isHealthcareDeleted) {
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
