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
exports.nightOpeningRouter = void 0;
var express_1 = __importDefault(require("express"));
var night_opening_repository_1 = require("../repositories/night_opening.repository");
var night_opening_controller_1 = require("../controllers/night_opening.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var nightOpeningRouter = express_1.default.Router();
exports.nightOpeningRouter = nightOpeningRouter;
nightOpeningRouter.get("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, night_opening_controller, night_opening;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                case 1:
                    night_opening_controller = _a.sent();
                    return [4 /*yield*/, night_opening_controller.getAllNightOpening(offset, limit)];
                case 2:
                    night_opening = _a.sent();
                    if (night_opening !== null) {
                        res.status(200);
                        res.json(night_opening);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
nightOpeningRouter.get("/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, night_opening;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, night_opening_repository_1.NightOpeningRepository.getNightOpening(Number(id))];
                case 1:
                    night_opening = _a.sent();
                    if (night_opening !== null) {
                        res.status(200);
                        res.json(night_opening);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
nightOpeningRouter.post("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var day, month, year, hour, minute, new_closing_date, night_opening_controller, night_opening;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    day = req.body.day;
                    month = req.body.month;
                    year = req.body.year;
                    hour = req.body.hour;
                    minute = req.body.minute;
                    if (day === undefined || month === undefined || year === undefined || hour === undefined || minute === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, night_opening_repository_1.NightOpeningRepository.fixDateType(new Date(year, month, day))];
                case 1:
                    new_closing_date = _a.sent();
                    new_closing_date.setUTCHours(hour, minute, 0);
                    return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                case 2:
                    night_opening_controller = _a.sent();
                    return [4 /*yield*/, night_opening_controller.createNightOpening(new_closing_date)];
                case 3:
                    night_opening = _a.sent();
                    if (night_opening !== null) {
                        res.status(200);
                        res.json(night_opening);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
nightOpeningRouter.put("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, day, month, year, hour, minute, new_closing_date, night_opening_controller, night_opening;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.body.id;
                    day = req.body.day;
                    month = req.body.month;
                    year = req.body.year;
                    hour = req.body.hour;
                    minute = req.body.minute;
                    if (id === undefined || day === undefined || month === undefined || year === undefined || hour === undefined || minute === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, night_opening_repository_1.NightOpeningRepository.fixDateType(new Date(year, month, day))];
                case 1:
                    new_closing_date = _a.sent();
                    new_closing_date.setUTCHours(hour, minute, 0);
                    return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                case 2:
                    night_opening_controller = _a.sent();
                    return [4 /*yield*/, night_opening_controller.updateNightOpening(id, new_closing_date)];
                case 3:
                    night_opening = _a.sent();
                    if (night_opening !== null) {
                        res.status(200);
                        res.json(night_opening);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
nightOpeningRouter.delete("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, nightOpeningController, nightOpening;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.body.id;
                    if (id === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, night_opening_controller_1.NightOpeningController.getInstance()];
                case 1:
                    nightOpeningController = _a.sent();
                    return [4 /*yield*/, nightOpeningController.deleteNightOpening(id)];
                case 2:
                    nightOpening = _a.sent();
                    if (nightOpening) {
                        res.status(200).end();
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
