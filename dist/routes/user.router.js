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
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get("/all", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, limit, userController, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : undefined;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : undefined;
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    return [4 /*yield*/, userController.getAll(offset, limit)];
                case 2:
                    users = _a.sent();
                    if (users !== null) {
                        res.status(200);
                        res.json(users);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
userRouter.get("/", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var auth, token, userController, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    auth = req.headers["authorization"];
                    if (auth === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    token = auth.replace('Bearer ', '');
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    return [4 /*yield*/, userController.getUser(token)];
                case 2:
                    user = _a.sent();
                    if (user !== null) {
                        res.status(200);
                        res.json(user);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
userRouter.put("/", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, surname, email, auth, token, userController, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.body.name;
                    surname = req.body.surname;
                    email = req.body.email;
                    if (name === undefined && surname === undefined && email === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    auth = req.headers["authorization"];
                    if (auth === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    token = auth.replace('Bearer ', '');
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    return [4 /*yield*/, userController.updateUser(token, {
                            name: name,
                            surname: surname,
                            email: email
                        })];
                case 2:
                    user = _a.sent();
                    if (user !== null) {
                        res.status(200);
                        res.json(user);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
userRouter.put("/password", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var password, new_password, new_password_confirm, auth, token, userController, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = req.body.password;
                    new_password = req.body.new_password;
                    new_password_confirm = req.body.new_password_confirm;
                    if (password === undefined || new_password === undefined || new_password_confirm === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    auth = req.headers["authorization"];
                    if (auth === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    token = auth.replace('Bearer ', '');
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    return [4 /*yield*/, userController.updatePassword(token, {
                            password: password,
                            new_password: new_password,
                            new_password_confirm: new_password_confirm
                        })];
                case 2:
                    user = _a.sent();
                    console.log(user);
                    if (user !== null) {
                        res.status(200);
                        res.json(user);
                    }
                    else {
                        res.status(404).end();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
userRouter.delete("/", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var password, auth, token, userController, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = req.body.password;
                    if (password === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    auth = req.headers["authorization"];
                    if (auth === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    token = auth.replace('Bearer ', '');
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    return [4 /*yield*/, userController.deleteUser(token, password)];
                case 2:
                    user = _a.sent();
                    console.log(user);
                    if (user !== null) {
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
