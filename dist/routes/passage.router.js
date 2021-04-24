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
exports.passageRouter = void 0;
var express_1 = __importDefault(require("express"));
var passage_repository_1 = require("../repositories/passage.repository");
var passage_controller_1 = require("../controllers/passage.controller");
var area_controller_1 = require("../controllers/area.controller");
var ticket_repository_1 = require("../repositories/ticket.repository");
var week_repository_1 = require("../repositories/week.repository");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var passageRouter = express_1.default.Router();
exports.passageRouter = passageRouter;
passageRouter.get("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, passageController, passage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                case 1:
                    passageController = _a.sent();
                    return [4 /*yield*/, passageController.getAllPassage(offset, limit)];
                case 2:
                    passage = _a.sent();
                    if (passage !== null) {
                        res.status(200);
                        res.json(passage);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.get("/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, passage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    if (id === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_repository_1.PassageRepository.getPassage(Number(id))];
                case 1:
                    passage = _a.sent();
                    if (passage !== null) {
                        res.status(200);
                        res.json(passage);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.post("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var day, month, year, area_id, ticket_id, ticket, areaController, area, passageController, date, passage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    day = req.body.day;
                    month = req.body.month;
                    year = req.body.year;
                    area_id = req.body.area_id;
                    ticket_id = req.body.ticket_id;
                    if (day === undefined || month === undefined || year === undefined || area_id === undefined || ticket_id === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ticket_repository_1.TicketRepository.getTicket(ticket_id)];
                case 1:
                    ticket = _a.sent();
                    if (ticket === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 2:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getArea(area_id, false)];
                case 3:
                    area = _a.sent();
                    if (area === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                case 4:
                    passageController = _a.sent();
                    return [4 /*yield*/, passage_repository_1.PassageRepository.fixDateType(new Date(year, month, day))];
                case 5:
                    date = _a.sent();
                    return [4 /*yield*/, passageController.createPassage(date, ticket, area)];
                case 6:
                    passage = _a.sent();
                    if (passage !== null) {
                        res.status(200);
                        res.json(passage);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.put("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, day, month, year, is_inside_the_area, passageController, date, passage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.body.id;
                    day = req.body.day;
                    month = req.body.month;
                    year = req.body.year;
                    is_inside_the_area = req.body.is_inside_the_area;
                    if (id === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                case 1:
                    passageController = _a.sent();
                    return [4 /*yield*/, passage_repository_1.PassageRepository.fixDateType(new Date(year, month, day))];
                case 2:
                    date = _a.sent();
                    return [4 /*yield*/, passageController.updatePassage(id, date, is_inside_the_area)];
                case 3:
                    passage = _a.sent();
                    if (passage !== null) {
                        res.status(200);
                        res.json(passage);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.delete("/", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, passageController, passage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.body.id;
                    if (id === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                case 1:
                    passageController = _a.sent();
                    return [4 /*yield*/, passageController.deletePassage(id)];
                case 2:
                    passage = _a.sent();
                    if (passage) {
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
passageRouter.post("/enter", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var ticket_id, area_id, ticket, areaController, area, passageController, passage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ticket_id = req.body.ticket_id;
                    area_id = req.body.area_id;
                    if (ticket_id === undefined || area_id === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ticket_repository_1.TicketRepository.getTicket(ticket_id)];
                case 1:
                    ticket = _a.sent();
                    if (ticket === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 2:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getArea(area_id, false)];
                case 3:
                    area = _a.sent();
                    if (area === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                case 4:
                    passageController = _a.sent();
                    return [4 /*yield*/, passageController.userEnter(ticket, area)];
                case 5:
                    passage = _a.sent();
                    if (passage) {
                        res.json(passage);
                        res.status(200).end();
                    }
                    else {
                        res.status(403).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.post("/leave", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var ticket_id, area_id, ticket, areaController, area, passageController, passage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ticket_id = req.body.ticket_id;
                    area_id = req.body.area_id;
                    if (ticket_id === undefined || area_id === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ticket_repository_1.TicketRepository.getTicket(ticket_id)];
                case 1:
                    ticket = _a.sent();
                    if (ticket === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, area_controller_1.AreaController.getInstance()];
                case 2:
                    areaController = _a.sent();
                    return [4 /*yield*/, areaController.getArea(area_id, false)];
                case 3:
                    area = _a.sent();
                    if (area === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_controller_1.PassageController.getInstance()];
                case 4:
                    passageController = _a.sent();
                    return [4 /*yield*/, passageController.userLeave(ticket, area)];
                case 5:
                    passage = _a.sent();
                    if (passage) {
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
passageRouter.get("/stats/actual", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, passage_repository_1.PassageRepository.getRealTimeStats()];
                case 1:
                    stats = _a.sent();
                    if (stats !== null) {
                        res.json(stats.length);
                        res.status(200).end();
                    }
                    else {
                        res.json(0);
                        res.status(200).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.get("/stats/actual/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, passage_repository_1.PassageRepository.getRealTimeStatsByArea(Number(req.params.id))];
                case 1:
                    stats = _a.sent();
                    if (stats !== null) {
                        res.json(stats.length);
                        res.status(200).end();
                    }
                    else {
                        res.json(0);
                        res.status(200).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.get("/stats/daily/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var day, month, year, date, stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    day = req.body.day;
                    month = req.body.month;
                    year = req.body.year;
                    if (day === undefined || month === undefined || year === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_repository_1.PassageRepository.fixDateType(new Date(year, month, day))];
                case 1:
                    date = _a.sent();
                    return [4 /*yield*/, passage_repository_1.PassageRepository.getAreaStatsByDay(Number(req.params.id), date)];
                case 2:
                    stats = _a.sent();
                    if (stats !== null) {
                        res.json(stats.length);
                        res.status(200).end();
                    }
                    else {
                        res.json(0);
                        res.status(200).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.get("/stats/daily", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var day, month, year, date, stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    day = req.body.day;
                    month = req.body.month;
                    year = req.body.year;
                    if (day === undefined || month === undefined || year === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_repository_1.PassageRepository.fixDateType(new Date(year, month, day))];
                case 1:
                    date = _a.sent();
                    return [4 /*yield*/, passage_repository_1.PassageRepository.getStatsByDay(date)];
                case 2:
                    stats = _a.sent();
                    if (stats !== null) {
                        res.json(stats.length);
                        res.status(200).end();
                    }
                    else {
                        res.json(0);
                        res.status(200).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.get("/stats/weekly/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var week_id, week, stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    week_id = req.body.week_id;
                    if (week_id === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, week_repository_1.WeekRepository.getWeekById(week_id)];
                case 1:
                    week = _a.sent();
                    if (week === null) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_repository_1.PassageRepository.getAreaStatsByWeek(Number(req.params.id), week)];
                case 2:
                    stats = _a.sent();
                    if (stats !== null) {
                        res.json(stats.length);
                        res.status(200).end();
                    }
                    else {
                        res.json(0);
                        res.status(200).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
passageRouter.get("/stats/weekly", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var week_id, week, stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    week_id = req.body.week_id;
                    if (week_id === undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, week_repository_1.WeekRepository.getWeekById(week_id)];
                case 1:
                    week = _a.sent();
                    if (week === null) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, passage_repository_1.PassageRepository.getStatsByWeek(week)];
                case 2:
                    stats = _a.sent();
                    if (stats !== null) {
                        res.json(stats.length);
                        res.status(200).end();
                    }
                    else {
                        res.json(0);
                        res.status(200).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
