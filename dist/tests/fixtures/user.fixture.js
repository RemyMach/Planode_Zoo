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
exports.UserFixture = void 0;
var models_1 = require("../../models");
var job_fixture_1 = require("./job.fixture");
var role_fixture_1 = require("./role.fixture");
var UserFixture = /** @class */ (function () {
    function UserFixture() {
    }
    UserFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (UserFixture.instance === undefined) {
                    UserFixture.instance = new UserFixture();
                }
                return [2 /*return*/, UserFixture.instance];
            });
        });
    };
    ;
    UserFixture.prototype.fillTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manager, jobFixture, roleFixture, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _f.sent();
                        return [4 /*yield*/, job_fixture_1.JobFixture.getInstance()];
                    case 2:
                        jobFixture = _f.sent();
                        return [4 /*yield*/, role_fixture_1.RoleFixture.getInstance()];
                    case 3:
                        roleFixture = _f.sent();
                        _a = this;
                        return [4 /*yield*/, manager.user.create({
                                name: "eric",
                                surname: "delacroix",
                                email: "eric@gmail.com",
                                password: "azertyuiop"
                            })];
                    case 4:
                        _a.user_admin = _f.sent();
                        return [4 /*yield*/, this.user_admin.setJob(jobFixture.job_receptionist)];
                    case 5:
                        _f.sent();
                        return [4 /*yield*/, this.user_admin.setRole(roleFixture.role_admin)];
                    case 6:
                        _f.sent();
                        _b = this;
                        return [4 /*yield*/, manager.user.create({
                                name: "Jean",
                                surname: "tom",
                                email: "tom@gmail.com",
                                password: "azertyuiop"
                            })];
                    case 7:
                        _b.user_normal = _f.sent();
                        return [4 /*yield*/, this.user_normal.setJob(jobFixture.job_service_agent)];
                    case 8:
                        _f.sent();
                        return [4 /*yield*/, this.user_normal.setRole(roleFixture.role_user)];
                    case 9:
                        _f.sent();
                        _c = this;
                        return [4 /*yield*/, manager.user.create({
                                name: "gentil",
                                surname: "Pam",
                                email: "pam.gentil@gmail.com",
                                password: "azertyuiop"
                            })];
                    case 10:
                        _c.user_normal_healer = _f.sent();
                        return [4 /*yield*/, this.user_normal_healer.setJob(jobFixture.job_healer)];
                    case 11:
                        _f.sent();
                        return [4 /*yield*/, this.user_normal_healer.setRole(roleFixture.role_admin)];
                    case 12:
                        _f.sent();
                        _d = this;
                        return [4 /*yield*/, manager.user.create({
                                name: "margaux",
                                surname: "prodic",
                                email: "margaux.prodic@gmail.com",
                                password: "azertyuiop"
                            })];
                    case 13:
                        _d.user_normal_veterinarian = _f.sent();
                        return [4 /*yield*/, this.user_normal_veterinarian.setJob(jobFixture.job_veterinary)];
                    case 14:
                        _f.sent();
                        return [4 /*yield*/, this.user_normal_veterinarian.setRole(roleFixture.role_admin)];
                    case 15:
                        _f.sent();
                        _e = this;
                        return [4 /*yield*/, manager.user.create({
                                name: "Rachel",
                                surname: "Friend",
                                email: "rachel@notime.com",
                                password: "azertyuiop"
                            })];
                    case 16:
                        _e.user_super_admin = _f.sent();
                        return [4 /*yield*/, this.user_super_admin.setJob(jobFixture.job_developer)];
                    case 17:
                        _f.sent();
                        return [4 /*yield*/, this.user_super_admin.setRole(roleFixture.role_super_admin)];
                    case 18:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.user.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.user.destroy({
                                truncate: true,
                                force: true
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserFixture;
}());
exports.UserFixture = UserFixture;
