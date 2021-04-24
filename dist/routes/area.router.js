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
exports.areaRouter = void 0;
var express_1 = __importDefault(require("express"));
var area_controller_1 = require("../controllers/area.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var image_controller_1 = require("../controllers/image.controller");
var type_controller_1 = require("../controllers/type.controller");
var areaRouter = express_1.default.Router();
exports.areaRouter = areaRouter;
areaRouter.get("/all", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, details, areaController, areas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    details = req.query.details === "true";
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 1:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getAll(offset, limit, details)];
                case 2:
                    areas = _a.sent();
                    if (areas !== null) {
                        res.status(200);
                        res.json(areas);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
areaRouter.get("/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var details, id, areaController, area;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    details = req.query.details === "true";
                    id = Number(req.params.id);
                    if (id === undefined || isNaN(id)) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 1:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getArea(id, details)];
                case 2:
                    area = _a.sent();
                    if (area !== null) {
                        res.status(200);
                        res.json(area);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
areaRouter.get("/:id/maintain", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var start_date, area_id, areaController, area;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start_date = req.query.start_date ? req.query.start_date : null;
                    area_id = req.params.id !== undefined ? Number.parseInt(req.params.id) : undefined;
                    if (area_id === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 1:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getAllMaintains(area_id, start_date)];
                case 2:
                    area = _a.sent();
                    if (area !== null) {
                        res.status(200);
                        res.json(area);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
areaRouter.get("/maintain/all", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var date, areaController, area;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = req.query.date ? req.query.date : null;
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 1:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getAllAreaInMaintain(date)];
                case 2:
                    area = _a.sent();
                    if (area !== null) {
                        res.status(200);
                        res.json(area).end();
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
areaRouter.put("/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, description, surface, bestMonth, visitorCapacity, visitDuration, disabledAccess, openingTime, closingTime, id, areaController, area;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.body.name;
                    description = req.body.description;
                    surface = req.body.surface;
                    bestMonth = req.body.best_month;
                    visitorCapacity = req.body.visitor_capacity;
                    visitDuration = req.body.visit_duration;
                    disabledAccess = req.body.disabled_access;
                    openingTime = req.body.opening_time;
                    closingTime = req.body.closing_time;
                    if (name === undefined && description === undefined && surface === undefined && bestMonth === undefined && disabledAccess === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 1:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.updateArea(Number(id), {
                            name: name,
                            description: description,
                            surface: surface,
                            best_month: bestMonth,
                            visitor_capacity: visitorCapacity,
                            visit_duration: visitDuration,
                            disabled_access: disabledAccess,
                            opening_time: openingTime,
                            closing_time: closingTime
                        })];
                case 2:
                    area = _a.sent();
                    if (area !== null) {
                        res.status(200);
                        res.json(area);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
areaRouter.post("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, description, image, typeId, surface, bestMonth, visitorCapacity, visitDuration, disabledAccess, openingTime, closingTime, imageController, imageInstance, typeController, typeInstance, areaController, area;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.body.name;
                    description = req.body.description;
                    image = req.body.image;
                    typeId = Number.parseInt(req.body.type_id);
                    surface = req.body.surface;
                    bestMonth = req.body.best_month;
                    visitorCapacity = req.body.visitor_capacity;
                    visitDuration = req.body.visit_duration;
                    disabledAccess = req.body.disabled_access;
                    openingTime = req.body.opening_time;
                    closingTime = req.body.closing_time;
                    if (name === undefined || description === undefined || image === undefined || surface === undefined || bestMonth === undefined || disabledAccess === undefined || typeId === undefined || isNaN(typeId)) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, image_controller_1.ImageController.getInstance()];
                case 1:
                    imageController = _a.sent();
                    return [4 /*yield*/, imageController.createImage({
                            image: image
                        })];
                case 2:
                    imageInstance = _a.sent();
                    if (imageInstance === null) {
                        res.status(500).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                case 3:
                    typeController = _a.sent();
                    return [4 /*yield*/, typeController.getTypeById(typeId, false)];
                case 4:
                    typeInstance = _a.sent();
                    if (typeInstance === null) {
                        res.status(500).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 5:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.createArea({
                            name: name,
                            description: description,
                            surface: surface,
                            best_month: bestMonth,
                            visitor_capacity: visitorCapacity,
                            visit_duration: visitDuration,
                            disabled_access: disabledAccess,
                            opening_time: openingTime,
                            closing_time: closingTime
                        })];
                case 6:
                    area = _a.sent();
                    if (!(area !== null)) return [3 /*break*/, 9];
                    return [4 /*yield*/, imageInstance.setArea(area)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, area.setType(typeInstance)];
                case 8:
                    _a.sent();
                    res.status(200);
                    res.json(area);
                    return [3 /*break*/, 10];
                case 9:
                    res.status(500).end();
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
});
areaRouter.delete("/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, areaController, area, isAreaDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 1:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getArea(Number(id), false)];
                case 2:
                    area = _a.sent();
                    if (area === null) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, areaController.deleteArea(Number(id))];
                case 3:
                    isAreaDeleted = _a.sent();
                    if (isAreaDeleted) {
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
