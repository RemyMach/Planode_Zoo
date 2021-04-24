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
exports.MaintainController = void 0;
var models_1 = require("../models");
var maintain_repository_1 = require("../repositories/maintain.repository");
var user_repository_1 = require("../repositories/user.repository");
var MaintainController = /** @class */ (function () {
    function MaintainController(user, maintain, area, possibleJobsForMaintain) {
        this.user = user;
        this.maintain = maintain;
        this.area = area;
        this.possibleJobsForMaintain = possibleJobsForMaintain;
    }
    MaintainController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, maintain, area;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(MaintainController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, maintain = _a.maintain, area = _a.area;
                        MaintainController.instance = new MaintainController(user, maintain, area, ["veterinary", "healer", "service_agent"]);
                        _b.label = 2;
                    case 2: return [2 /*return*/, MaintainController.instance];
                }
            });
        });
    };
    MaintainController.prototype.createAMaintain = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var start_date_formated, end_date_formated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start_date_formated = this.convertStringDateInDateFormat(props.start_date);
                        end_date_formated = this.convertStringDateInDateFormat(props.end_date);
                        if (start_date_formated === null || end_date_formated === null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, maintain_repository_1.MaintainRepository.createMaintain(start_date_formated, end_date_formated, props.user_id, props.area_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainController.prototype.deleteAMaintain = function (maintain_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, maintain_repository_1.MaintainRepository.deleteAMaintainById(maintain_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainController.prototype.updateAMaintain = function (maintain_id, props) {
        return __awaiter(this, void 0, void 0, function () {
            var maintain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.maintain.findByPk(maintain_id)];
                    case 1:
                        maintain = _a.sent();
                        if (maintain === null)
                            return [2 /*return*/, null];
                        this.formateUpdateOption(props);
                        return [4 /*yield*/, maintain_repository_1.MaintainRepository.updateAMaintain(maintain, props)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainController.prototype.addAUserToAMaintain = function (maintain_id, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var maintain, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.maintain.findByPk(maintain_id)];
                    case 1:
                        maintain = _a.sent();
                        if (maintain === null)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, user_repository_1.UserRepository.getUserByIdAndVerifyJob(user_id, this.possibleJobsForMaintain)];
                    case 2:
                        user = _a.sent();
                        if (user === null)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, user.addMaintain(maintain)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, maintain_repository_1.MaintainRepository.getMaintainById(maintain_id)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainController.prototype.getMaintainWithUsers = function (maintain_id) {
        return __awaiter(this, void 0, void 0, function () {
            var maintain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.maintain.findByPk(maintain_id)];
                    case 1:
                        maintain = _a.sent();
                        if (maintain === null)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, maintain_repository_1.MaintainRepository.getMaintainById(maintain_id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainController.prototype.getMaintainsSinceADate = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.formateGetOption(props);
                        return [4 /*yield*/, maintain_repository_1.MaintainRepository.getMaintainsSinceADate(props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainController.prototype.convertStringDateInDateFormat = function (date) {
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
    MaintainController.prototype.formateUpdateOption = function (props) {
        if (props.start_date !== undefined && typeof props.start_date === 'string') {
            var start_date_formated = this.convertStringDateInDateFormat(props.start_date);
            if (start_date_formated !== null) {
                props.start_date = start_date_formated;
            }
        }
        if (props.end_date !== undefined && typeof props.end_date === 'string') {
            var end_date_formated = this.convertStringDateInDateFormat(props.end_date);
            if (end_date_formated !== null) {
                props.end_date = end_date_formated;
            }
        }
    };
    MaintainController.prototype.formateGetOption = function (props) {
        if (props.start_date !== undefined && typeof props.start_date === 'string') {
            var start_date_formated = this.convertStringDateInDateFormat(props.start_date);
            if (start_date_formated !== null) {
                props.start_date = start_date_formated;
            }
        }
    };
    return MaintainController;
}());
exports.MaintainController = MaintainController;
