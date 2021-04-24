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
exports.presenceRouter = void 0;
var express_1 = __importDefault(require("express"));
var presence_controller_1 = require("../controllers/presence.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var presenceRouter = express_1.default.Router();
exports.presenceRouter = presenceRouter;
presenceRouter.get("/prevision/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_user, presenceController, presence;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_user = req.params.id ? Number.parseInt(req.params.id) : undefined;
                    if (id_user === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.getPresenceForAUser(id_user, { is_programmed: true })];
                case 2:
                    presence = _a.sent();
                    if (presence !== null) {
                        res.status(200);
                        res.json(presence);
                    }
                    else {
                        res.status(400).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
presenceRouter.get("/work/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_user, presenceController, presence;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_user = req.params.id ? Number.parseInt(req.params.id) : undefined;
                    if (id_user === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.getPresenceForAUser(id_user, { is_worked: true })];
                case 2:
                    presence = _a.sent();
                    if (presence !== null) {
                        res.status(200);
                        res.json(presence);
                    }
                    else {
                        res.status(400).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
presenceRouter.get("/unavailable/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_user, presenceController, presence;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_user = req.params.id ? Number.parseInt(req.params.id) : undefined;
                    if (id_user === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.getPresenceForAUser(id_user, { is_available: false })];
                case 2:
                    presence = _a.sent();
                    if (presence !== null) {
                        res.status(200);
                        res.json(presence);
                    }
                    else {
                        res.status(400).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
presenceRouter.get("/available", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var start_date, end_date, presenceController, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start_date = req.query.start_date;
                    end_date = req.query.end_date;
                    if (start_date === undefined || end_date === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.getAvailableUsersForAPeriod(start_date, end_date, { is_available: true })];
                case 2:
                    users = _a.sent();
                    if (users !== null) {
                        res.status(200);
                        res.json(users);
                    }
                    else {
                        res.status(400).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
presenceRouter.get("/available/:job", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var start_date, end_date, job, presenceController, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start_date = req.query.start_date;
                    end_date = req.query.end_date;
                    job = req.params.job;
                    if (start_date === undefined || end_date === undefined || job === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.getAvailableUsersForAPeriodWithASpecificWork(job, start_date, end_date, { is_available: true })];
                case 2:
                    users = _a.sent();
                    if (users !== null) {
                        res.status(200);
                        res.json(users);
                    }
                    else {
                        res.status(400).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
presenceRouter.get("/prevision", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var start_date, end_date, presenceController, users, zooCanOpenForThePeriod, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start_date = req.query.start_date;
                    end_date = req.query.end_date;
                    if (start_date === undefined || end_date === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.getUsersProgrammedForAPeriod(start_date, end_date, { is_programmed: true, is_available: true })];
                case 2:
                    users = _a.sent();
                    if (!(users !== null)) return [3 /*break*/, 4];
                    return [4 /*yield*/, presenceController.zooCanOpenWithThisUsers(users)];
                case 3:
                    zooCanOpenForThePeriod = _a.sent();
                    message = zooCanOpenForThePeriod === false ? "zoo can't open for this Period" : "zoo can open for this period";
                    res.status(200);
                    res.json({ users: users, message: message });
                    return [3 /*break*/, 5];
                case 4:
                    res.status(400).end();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
});
presenceRouter.put("/prevision/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_user, date_start, value, presenceController, presence;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_user = req.params.id ? Number.parseInt(req.params.id) : undefined;
                    date_start = req.body.date_start;
                    value = req.body.value ? Boolean(Number.parseInt(req.body.value)) : undefined;
                    if (id_user === undefined || date_start === undefined || value === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.updatePresenceUpdateOption(id_user, date_start, { is_programmed: value })];
                case 2:
                    presence = _a.sent();
                    console.log("presence -> " + presence);
                    if (presence !== null) {
                        res.status(200);
                        res.json(presence);
                    }
                    else {
                        res.status(400).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
presenceRouter.put("/work/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_user, date_start, value, presenceController, presence;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_user = req.params.id ? Number.parseInt(req.params.id) : undefined;
                    date_start = req.body.date_start;
                    value = req.body.value ? Boolean(Number.parseInt(req.body.value)) : undefined;
                    if (id_user === undefined || date_start === undefined || value === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.updatePresenceUpdateOption(id_user, date_start, { is_worked: value })];
                case 2:
                    presence = _a.sent();
                    if (presence !== null) {
                        res.status(200);
                        res.json(presence);
                    }
                    else {
                        res.status(400).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
presenceRouter.put("/available/:id", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_user, date_start, value, presenceController, presence;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_user = req.params.id ? Number.parseInt(req.params.id) : undefined;
                    date_start = req.body.date_start;
                    value = req.body.value ? Boolean(Number.parseInt(req.body.value)) : undefined;
                    if (id_user === undefined || date_start === undefined || value === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                case 1:
                    presenceController = _a.sent();
                    return [4 /*yield*/, presenceController.updatePresenceUpdateOption(id_user, date_start, { is_available: value })];
                case 2:
                    presence = _a.sent();
                    if (presence !== null) {
                        res.status(200);
                        res.json(presence);
                    }
                    else {
                        res.status(400).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
