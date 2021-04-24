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
exports.PresenceController = void 0;
var models_1 = require("../models");
var user_repository_1 = require("../repositories/user.repository");
var presence_repository_1 = require("../repositories/presence.repository");
var PresenceController = /** @class */ (function () {
    function PresenceController(user, week, presence) {
        this.user = user;
        this.week = week;
        this.presence = presence;
    }
    PresenceController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, week, presence;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(PresenceController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, week = _a.week, presence = _a.presence;
                        PresenceController.instance = new PresenceController(user, week, presence);
                        _b.label = 2;
                    case 2: return [2 /*return*/, PresenceController.instance];
                }
            });
        });
    };
    PresenceController.prototype.getPresenceForAUser = function (id_user, props) {
        return __awaiter(this, void 0, void 0, function () {
            var user__to_modify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user__to_modify = user_repository_1.UserRepository.getUserById(id_user);
                        if (user__to_modify === null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, presence_repository_1.PresenceRepository.getPresenceForAUser(id_user, this.getFormatedGetOption(props))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PresenceController.prototype.getAvailableUsersForAPeriod = function (start_date, end_date, props) {
        return __awaiter(this, void 0, void 0, function () {
            var start_date_formated, end_date_formated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start_date_formated = this.convertStringDateInDateFormat(start_date);
                        end_date_formated = this.convertStringDateInDateFormat(end_date);
                        if (start_date_formated === null || end_date_formated === null || end_date_formated < start_date_formated) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, presence_repository_1.PresenceRepository.getAvailableUsersForAPeriod(start_date_formated, end_date_formated, this.getFormatedGetOption(props))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PresenceController.prototype.getAvailableUsersForAPeriodWithASpecificWork = function (work, start_date, end_date, props) {
        return __awaiter(this, void 0, void 0, function () {
            var start_date_formated, end_date_formated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start_date_formated = this.convertStringDateInDateFormat(start_date);
                        end_date_formated = this.convertStringDateInDateFormat(end_date);
                        if (start_date_formated === null || end_date_formated === null || end_date_formated < start_date_formated) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, presence_repository_1.PresenceRepository.getAvailableUsersForAPeriodWithASpecificWork(work, start_date_formated, end_date_formated)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PresenceController.prototype.getUsersProgrammedForAPeriod = function (start_date, end_date, props) {
        return __awaiter(this, void 0, void 0, function () {
            var start_date_formated, end_date_formated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start_date_formated = this.convertStringDateInDateFormat(start_date);
                        end_date_formated = this.convertStringDateInDateFormat(end_date);
                        if (start_date_formated === null || end_date_formated === null || end_date_formated < start_date_formated) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, presence_repository_1.PresenceRepository.getProgrammedUsersForAPeriod(start_date_formated, end_date_formated, this.getFormatedGetOption(props))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PresenceController.prototype.zooCanOpenWithThisUsers = function (users) {
        var usersJSON = JSON.parse(JSON.stringify(users));
        var jobsNeededForAtLeastOnePerson = ['receptionist', 'service_agent', 'seller', 'healer'];
        jobsNeededForAtLeastOnePerson.sort();
        var users_Job = usersJSON.map(function (user) { return user['Job']['label']; }).sort();
        var result_table = jobsNeededForAtLeastOnePerson.map(function (user) {
            for (var i = 0; i < users_Job.length; i++) {
                console.log("job -> " + users_Job[i]);
                console.log("other job -> " + user);
                if (user == users_Job[i]) {
                    return '';
                }
                if (user < users_Job[i]) {
                    break;
                }
            }
        });
        for (var i = 0; i < result_table.length; i++) {
            if (result_table[i] === undefined)
                return false;
        }
        return true;
    };
    PresenceController.prototype.updatePresenceUpdateOption = function (id_user, date, props) {
        return __awaiter(this, void 0, void 0, function () {
            var user__to_modify, date_formated, presence_line;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user__to_modify = user_repository_1.UserRepository.getUserById(id_user);
                        if (user__to_modify === null) {
                            return [2 /*return*/, null];
                        }
                        date_formated = this.convertStringDateInDateFormat(date);
                        console.log("date -> " + date_formated);
                        if (date_formated === null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, presence_repository_1.PresenceRepository.getPresenceLineForADate(id_user, date_formated)];
                    case 1:
                        presence_line = _a.sent();
                        console.log(presence_line);
                        if (!(presence_line === null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createPresenceLine(id_user, date_formated, props)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, presence_repository_1.PresenceRepository.updatePresenceLine(id_user, date_formated, this.getFormatedUpdateOption(props))];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PresenceController.prototype.createPresenceLine = function (id_user, date, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (props.is_available === undefined)
                    props.is_available = true;
                return [2 /*return*/, presence_repository_1.PresenceRepository.createPresenceLine(id_user, date, this.getFormatedUpdateOption(props))];
            });
        });
    };
    PresenceController.prototype.getFormatedUpdateOption = function (props) {
        if (props.is_worked === undefined)
            delete props.is_worked;
        if (props.is_programmed === undefined)
            delete props.is_programmed;
        if (props.is_available === undefined)
            delete props.is_available;
        return JSON.parse(JSON.stringify(props));
    };
    PresenceController.prototype.getFormatedGetOption = function (props) {
        if (props.is_worked === undefined)
            delete props.is_worked;
        if (props.is_programmed === undefined)
            delete props.is_programmed;
        if (props.is_available === undefined)
            delete props.is_available;
        return JSON.parse(JSON.stringify(props));
    };
    PresenceController.prototype.convertStringDateInDateFormat = function (date) {
        try {
            var new_date = new Date(date);
            new_date.setUTCHours(0, 0, 0, 0);
            new_date.setDate((new_date.getDate() + 1));
            return new_date;
        }
        catch (_a) {
            return null;
        }
    };
    return PresenceController;
}());
exports.PresenceController = PresenceController;
