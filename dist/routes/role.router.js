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
exports.roleRouter = void 0;
var express_1 = __importDefault(require("express"));
var role_controller_1 = require("../controllers/role.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var roleRouter = express_1.default.Router();
exports.roleRouter = roleRouter;
roleRouter.get("/all", auth_middleware_1.superAdminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, roleController, roles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    return [4 /*yield*/, role_controller_1.RoleController.getInstance()];
                case 1:
                    roleController = _a.sent();
                    return [4 /*yield*/, roleController.getAll(offset, limit)];
                case 2:
                    roles = _a.sent();
                    if (roles !== null) {
                        res.status(200);
                        res.json(roles);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
roleRouter.get("/user", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, roleController, jobs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    return [4 /*yield*/, role_controller_1.RoleController.getInstance()];
                case 1:
                    roleController = _a.sent();
                    return [4 /*yield*/, roleController.getAllRolesWithUsers(offset, limit)];
                case 2:
                    jobs = _a.sent();
                    if (jobs !== null) {
                        res.status(200);
                        res.json(jobs);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
roleRouter.post("/", auth_middleware_1.superAdminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var label_role, roleController, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    label_role = req.body.role;
                    if (label_role === undefined) {
                        res.status(404).end();
                    }
                    return [4 /*yield*/, role_controller_1.RoleController.getInstance()];
                case 1:
                    roleController = _a.sent();
                    return [4 /*yield*/, roleController.createRole(label_role)];
                case 2:
                    role = _a.sent();
                    if (role !== null) {
                        res.status(201);
                        res.json(role);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
roleRouter.put("/:id", auth_middleware_1.superAdminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var label, id_role, roleController, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    label = req.body.new_label;
                    id_role = req.params.id !== undefined ? Number.parseInt(req.params.id) : undefined;
                    if (label === undefined || id_role === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, role_controller_1.RoleController.getInstance()];
                case 1:
                    roleController = _a.sent();
                    return [4 /*yield*/, roleController.updateRole(id_role, {
                            label: label
                        })];
                case 2:
                    role = _a.sent();
                    if (role !== null) {
                        res.status(200);
                        res.json(role);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
roleRouter.delete("/:id", auth_middleware_1.superAdminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_role, roleController, job;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_role = req.params.id !== undefined ? Number.parseInt(req.params.id) : undefined;
                    if (id_role === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, role_controller_1.RoleController.getInstance()];
                case 1:
                    roleController = _a.sent();
                    return [4 /*yield*/, roleController.deleteRole(id_role)];
                case 2:
                    job = _a.sent();
                    if (job !== null) {
                        res.status(200);
                        res.json(job);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
