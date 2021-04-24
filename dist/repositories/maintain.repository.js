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
exports.MaintainRepository = void 0;
var maintain_controller_1 = require("../controllers/maintain.controller");
var sequelize_1 = require("sequelize");
var MaintainRepository = /** @class */ (function () {
    function MaintainRepository() {
    }
    MaintainRepository.createMaintain = function (start_date, end_date, user_id, area_id) {
        return __awaiter(this, void 0, void 0, function () {
            var maintainController, area, user, maintain, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, maintain_controller_1.MaintainController.getInstance()];
                    case 1:
                        maintainController = _b.sent();
                        return [4 /*yield*/, maintainController.area.findByPk(area_id)];
                    case 2:
                        area = _b.sent();
                        return [4 /*yield*/, maintainController.user.findByPk(user_id)];
                    case 3:
                        user = _b.sent();
                        if (user === null || area === null) {
                            return [2 /*return*/, null];
                        }
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 8, , 9]);
                        return [4 /*yield*/, maintainController.maintain.create({
                                start_date: start_date,
                                end_date: end_date,
                            })];
                    case 5:
                        maintain = _b.sent();
                        return [4 /*yield*/, maintain.setArea(area)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, maintain.addUser(user)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 9: return [4 /*yield*/, this.getMaintainById(maintain.id)];
                    case 10: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    MaintainRepository.getMaintainById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var maintainController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, maintain_controller_1.MaintainController.getInstance()];
                    case 1:
                        maintainController = _a.sent();
                        return [4 /*yield*/, maintainController.maintain.findOne({
                                attributes: ["id", "start_date", "end_date"],
                                where: {
                                    id: id
                                },
                                include: [{
                                        model: maintainController.area,
                                        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt'] }
                                    }, {
                                        model: maintainController.user,
                                        attributes: ['id', 'name', 'surname', 'email']
                                    }],
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainRepository.deleteAMaintainById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var maintainController, maintain_to_destroy, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, maintain_controller_1.MaintainController.getInstance()];
                    case 1:
                        maintainController = _b.sent();
                        return [4 /*yield*/, maintainController.maintain.findOne({
                                where: {
                                    id: id,
                                },
                                paranoid: true
                            })];
                    case 2:
                        maintain_to_destroy = _b.sent();
                        if (maintain_to_destroy === null)
                            return [2 /*return*/, null];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, maintain_to_destroy.destroy()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/, true];
                }
            });
        });
    };
    MaintainRepository.updateAMaintain = function (maintain, props) {
        return __awaiter(this, void 0, void 0, function () {
            var props_parse, maintain_update, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        props_parse = JSON.parse(JSON.stringify(props));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, maintain.update(props_parse)];
                    case 2:
                        maintain_update = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 4:
                        if (maintain_update === null)
                            return [2 /*return*/, null];
                        return [2 /*return*/, maintain_update];
                }
            });
        });
    };
    MaintainRepository.getMaintainsSinceADate = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var maintainController;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, maintain_controller_1.MaintainController.getInstance()];
                    case 1:
                        maintainController = _b.sent();
                        if (props.start_date === undefined)
                            props.start_date = new Date(70, 1, 1);
                        return [4 /*yield*/, maintainController.maintain.findAll({
                                attributes: ["id", "start_date", "end_date"],
                                where: {
                                    start_date: (_a = {},
                                        _a[sequelize_1.Op.gte] = props.start_date,
                                        _a)
                                },
                                include: [{
                                        model: maintainController.area,
                                        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt'] }
                                    }],
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return MaintainRepository;
}());
exports.MaintainRepository = MaintainRepository;
