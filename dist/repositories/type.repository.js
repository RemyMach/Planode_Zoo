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
exports.TypeRepository = void 0;
var type_controller_1 = require("../controllers/type.controller");
var TypeRepository = /** @class */ (function () {
    function TypeRepository() {
    }
    TypeRepository.createType = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.type.create(props)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TypeRepository.getAllTypes = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.type.findAll({
                                attributes: ['id', 'name'],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TypeRepository.getAllTypesDetails = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.type.findAll({
                                attributes: ['id', 'name'],
                                include: [{
                                        model: typeController.area,
                                        attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access']
                                    }],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TypeRepository.getTypeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.type.findOne({
                                attributes: ['id', 'name'],
                                where: {
                                    id: id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TypeRepository.getTypeDetailsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.type.findOne({
                                attributes: ['id', 'name'],
                                include: [{
                                        model: typeController.area,
                                        attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access']
                                    }],
                                where: {
                                    id: id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TypeRepository.getTypeByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.type.findOne({
                                attributes: ['id', 'name'],
                                where: {
                                    name: name
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TypeRepository.getTypeDetailsByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.type.findOne({
                                attributes: ['id', 'name'],
                                include: [{
                                        model: typeController.area,
                                        attributes: ['id', 'name', 'description', 'image', 'surface', 'best_month', 'disabled_access']
                                    }],
                                where: {
                                    name: name
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TypeRepository.updateType = function (id, props) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController, type, props_convert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.getTypeById(id, false)];
                    case 2:
                        type = _a.sent();
                        props_convert = JSON.parse(JSON.stringify(props));
                        if (type === undefined || (type === null || type === void 0 ? void 0 : type.id) === undefined) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, typeController.type.update(props_convert, {
                                where: {
                                    id: type.id
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, typeController.getTypeById(id, false)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TypeRepository.deleteType = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var typeController, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, type_controller_1.TypeController.getInstance()];
                    case 1:
                        typeController = _a.sent();
                        return [4 /*yield*/, typeController.type.destroy({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, typeController.getTypeById(id, false)];
                    case 3:
                        type = _a.sent();
                        return [2 /*return*/, type === null];
                }
            });
        });
    };
    return TypeRepository;
}());
exports.TypeRepository = TypeRepository;
