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
exports.AnimalRepository = void 0;
var animal_controller_1 = require("../controllers/animal.controller");
var AnimalRepository = /** @class */ (function () {
    function AnimalRepository() {
    }
    AnimalRepository.createAnimal = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.animal.create(props)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnimalRepository.getAllAnimals = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.animal.findAll({
                                attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnimalRepository.getAllDetailsAnimals = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.animal.findAll({
                                attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
                                include: [{
                                        model: animalController.race,
                                        attributes: ['id', 'breed'],
                                        include: [{
                                                model: animalController.species,
                                                attributes: ['id', 'name']
                                            }]
                                    }, {
                                        model: animalController.healthcare,
                                        attributes: ['id', 'date', 'name', 'notes', 'cost', 'success']
                                    }, {
                                        model: animalController.location,
                                        attributes: ['id', 'entry_date', 'exit_date'],
                                        include: [{
                                                model: animalController.area,
                                                attributes: ['id', 'name']
                                            }]
                                    }],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnimalRepository.getAnimalById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.animal.findOne({
                                attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
                                where: {
                                    id: id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnimalRepository.getAnimalDetailsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.animal.findOne({
                                attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
                                include: [{
                                        model: animalController.race,
                                        attributes: ['id', 'breed'],
                                        include: [{
                                                model: animalController.species,
                                                attributes: ['id', 'name']
                                            }]
                                    }, {
                                        model: animalController.healthcare,
                                        attributes: ['id', 'date', 'name', 'notes', 'cost', 'success']
                                    }, {
                                        model: animalController.location,
                                        attributes: ['id', 'entry_date', 'exit_date'],
                                        include: [{
                                                model: animalController.area,
                                                attributes: ['id', 'name']
                                            }]
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
    AnimalRepository.getAnimalByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.animal.findOne({
                                attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
                                where: {
                                    name: name
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnimalRepository.getAnimalDetailsByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.animal.findOne({
                                attributes: ['id', 'name', 'birthdate', 'height', 'weight'],
                                include: [{
                                        model: animalController.race,
                                        attributes: ['id', 'breed'],
                                        include: [{
                                                model: animalController.species,
                                                attributes: ['id', 'name']
                                            }]
                                    }, {
                                        model: animalController.healthcare,
                                        attributes: ['id', 'date', 'name', 'notes', 'cost', 'success']
                                    }, {
                                        model: animalController.location,
                                        attributes: ['id', 'entry_date', 'exit_date'],
                                        include: [{
                                                model: animalController.area,
                                                attributes: ['id', 'name']
                                            }]
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
    AnimalRepository.updateAnimal = function (id, props) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController, animal, props_convert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.getAnimalById(id, false)];
                    case 2:
                        animal = _a.sent();
                        props_convert = JSON.parse(JSON.stringify(props));
                        if (animal === undefined || (animal === null || animal === void 0 ? void 0 : animal.id) === undefined) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, animalController.animal.update(props_convert, {
                                where: {
                                    id: animal.id
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, animalController.getAnimalById(id, false)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnimalRepository.deleteAnimal = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var animalController, species;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, animal_controller_1.AnimalController.getInstance()];
                    case 1:
                        animalController = _a.sent();
                        return [4 /*yield*/, animalController.animal.destroy({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, animalController.getAnimalById(id, false)];
                    case 3:
                        species = _a.sent();
                        return [2 /*return*/, species === null];
                }
            });
        });
    };
    return AnimalRepository;
}());
exports.AnimalRepository = AnimalRepository;
