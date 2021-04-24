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
exports.PresenceRepository = void 0;
var presence_controller_1 = require("../controllers/presence.controller");
var user_repository_1 = require("./user.repository");
var week_repository_1 = require("./week.repository");
var user_controller_1 = require("../controllers/user.controller");
var sequelize_1 = require("sequelize");
var PresenceRepository = /** @class */ (function () {
    function PresenceRepository() {
    }
    PresenceRepository.getPresenceLineForADate = function (id_user, date) {
        return __awaiter(this, void 0, void 0, function () {
            var presenceController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                    case 1:
                        presenceController = _a.sent();
                        return [2 /*return*/, presenceController.user.findOne({
                                attributes: ['id', 'email'],
                                where: {
                                    id: id_user
                                },
                                include: [{
                                        model: presenceController.week,
                                        attributes: ['start_date', 'end_date'],
                                        where: {
                                            start_date: date
                                        },
                                        // ici on séléctionne les bons attributs de la table associative
                                        through: {
                                            attributes: ['id', 'is_programmed', 'is_worked', 'is_available']
                                        }
                                    }],
                            })];
                }
            });
        });
    };
    PresenceRepository.getAvailableUsersForAPeriod = function (start_date_formated, end_date_formated, props) {
        return __awaiter(this, void 0, void 0, function () {
            var presenceController, userController;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                    case 1:
                        presenceController = _c.sent();
                        return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 2:
                        userController = _c.sent();
                        if (props['is_available'] === undefined) {
                            props['is_available'] = true;
                        }
                        return [2 /*return*/, presenceController.user.findAll({
                                attributes: ['id', 'email'],
                                include: [{
                                        model: userController.role,
                                        attributes: ['label']
                                    }, {
                                        model: userController.job,
                                        attributes: ['label']
                                    }, {
                                        model: presenceController.week,
                                        required: false,
                                        attributes: ['start_date', 'end_date'],
                                        where: {
                                            start_date: (_a = {},
                                                _a[sequelize_1.Op.lte] = start_date_formated,
                                                _a),
                                            end_date: (_b = {},
                                                _b[sequelize_1.Op.gte] = end_date_formated,
                                                _b)
                                        },
                                        // ici on séléctionne les bons attributs de la table associative
                                        through: {
                                            attributes: ['id', 'is_programmed', 'is_worked', 'is_available'],
                                            where: props
                                        }
                                    }],
                            })];
                }
            });
        });
    };
    PresenceRepository.getProgrammedUsersForAPeriod = function (start_date_formated, end_date_formated, props) {
        return __awaiter(this, void 0, void 0, function () {
            var presenceController, userController;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                    case 1:
                        presenceController = _c.sent();
                        return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 2:
                        userController = _c.sent();
                        if (props['is_available'] === undefined) {
                            props['is_available'] = true;
                        }
                        return [4 /*yield*/, presenceController.user.findAll({
                                attributes: ['id', 'email'],
                                include: [{
                                        model: userController.role,
                                        attributes: ['label']
                                    }, {
                                        model: userController.job,
                                        attributes: ['label']
                                    }, {
                                        model: presenceController.week,
                                        attributes: ['start_date', 'end_date'],
                                        where: {
                                            start_date: (_a = {},
                                                _a[sequelize_1.Op.lte] = start_date_formated,
                                                _a),
                                            end_date: (_b = {},
                                                _b[sequelize_1.Op.gte] = end_date_formated,
                                                _b)
                                        },
                                        // ici on séléctionne les bons attributs de la table associative
                                        through: {
                                            attributes: ['id', 'is_programmed', 'is_worked', 'is_available'],
                                            where: props
                                        }
                                    }],
                            })];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PresenceRepository.getAvailableUsersForAPeriodWithASpecificWork = function (work, start_date_formated, end_date_formated) {
        return __awaiter(this, void 0, void 0, function () {
            var presenceController, userController;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                    case 1:
                        presenceController = _c.sent();
                        return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 2:
                        userController = _c.sent();
                        return [4 /*yield*/, presenceController.user.findAll({
                                attributes: ['id', 'email'],
                                include: [{
                                        model: userController.role,
                                        attributes: ['label']
                                    }, {
                                        model: userController.job,
                                        attributes: ['label'],
                                        where: {
                                            label: work
                                        }
                                    }, {
                                        model: presenceController.week,
                                        required: false,
                                        attributes: ['start_date', 'end_date'],
                                        where: {
                                            start_date: (_a = {},
                                                _a[sequelize_1.Op.gte] = start_date_formated,
                                                _a),
                                            end_date: (_b = {},
                                                _b[sequelize_1.Op.lte] = end_date_formated,
                                                _b)
                                        },
                                        // ici on séléctionne les bons attributs de la table associative
                                        through: {
                                            attributes: ['id', 'is_programmed', 'is_worked', 'is_available'],
                                            where: {
                                                is_available: true
                                            }
                                        }
                                    }],
                            })];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PresenceRepository.getPresenceFromWeekAndUser = function (id_user, date) {
        return __awaiter(this, void 0, void 0, function () {
            var presenceController, user, json, id_presence;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                    case 1:
                        presenceController = _a.sent();
                        return [4 /*yield*/, this.getPresenceLineForADate(id_user, date)];
                    case 2:
                        user = _a.sent();
                        if (user === null) {
                            return [2 /*return*/, null];
                        }
                        json = JSON.parse(JSON.stringify(user));
                        id_presence = json['Weeks'][0]['Presence']['id'];
                        return [4 /*yield*/, presenceController.presence.findByPk(id_presence, { attributes: ['is_programmed', 'is_worked', 'is_available'] })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PresenceRepository.getPresenceForAUser = function (id_user, props) {
        return __awaiter(this, void 0, void 0, function () {
            var presenceController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                    case 1:
                        presenceController = _a.sent();
                        if (props['is_available'] === undefined) {
                            props['is_available'] = true;
                        }
                        return [4 /*yield*/, presenceController.user.findAll({
                                attributes: ['id', 'email'],
                                where: {
                                    id: id_user
                                },
                                include: [{
                                        model: presenceController.week,
                                        attributes: ['start_date', 'end_date'],
                                        // ici on séléctionne les bons attributs de la table associative
                                        through: {
                                            attributes: ['id', 'is_programmed', 'is_worked', 'is_available'],
                                            where: props
                                        }
                                    }],
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PresenceRepository.updatePresenceLine = function (id_user, date, props) {
        return __awaiter(this, void 0, void 0, function () {
            var presenceController, user, json, id_presence, whereJSON, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                    case 1:
                        presenceController = _a.sent();
                        return [4 /*yield*/, this.getPresenceLineForADate(id_user, date)];
                    case 2:
                        user = _a.sent();
                        if (user === null) {
                            return [2 /*return*/, null];
                        }
                        console.log(props);
                        json = JSON.parse(JSON.stringify(user));
                        id_presence = json['Weeks'][0]['Presence']['id'];
                        whereJSON = {};
                        whereJSON.id = id_presence;
                        if (props['is_available'] === undefined) {
                            whereJSON.is_available = true;
                        }
                        console.log("where -> " + whereJSON);
                        return [4 /*yield*/, presenceController.presence.update(props, {
                                where: whereJSON,
                                returning: false,
                            })];
                    case 3:
                        res = _a.sent();
                        return [4 /*yield*/, presenceController.presence.findByPk(id_presence, { attributes: ['is_programmed', 'is_worked', 'is_available'] })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PresenceRepository.createPresenceLine = function (id_user, date, props) {
        return __awaiter(this, void 0, void 0, function () {
            var presenceController, user, week;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, presence_controller_1.PresenceController.getInstance()];
                    case 1:
                        presenceController = _a.sent();
                        return [4 /*yield*/, user_repository_1.UserRepository.getUserById(id_user)];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, week_repository_1.WeekRepository.getWeekByTheStartDate(date)];
                    case 3:
                        week = _a.sent();
                        //console.log(user);
                        //console.log(week);
                        if (user === null || week === null) {
                            return [2 /*return*/, null];
                        }
                        props['is_available'] = true;
                        console.log("je passe la");
                        console.log(props);
                        return [4 /*yield*/, user.addWeek(week, { through: props })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.getPresenceFromWeekAndUser(id_user, date)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PresenceRepository;
}());
exports.PresenceRepository = PresenceRepository;
