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
exports.destroyTablesElement = exports.fillTables = void 0;
var week_fixture_1 = require("./week.fixture");
var user_fixture_1 = require("./user.fixture");
var job_fixture_1 = require("./job.fixture");
var role_fixture_1 = require("./role.fixture");
var session_fixture_1 = require("./session.fixture");
var species_fixture_1 = require("./species.fixture");
var race_fixture_1 = require("./race.fixture");
var animal_fixture_1 = require("./animal.fixture");
var healthcare_fixture_1 = require("./healthcare.fixture");
var area_fixture_1 = require("./area.fixture");
var location_fixture_1 = require("./location.fixture");
var condition_fixture_1 = require("./condition.fixture");
var status_fixture_1 = require("./status.fixture");
var maintain_fixture_1 = require("./maintain.fixture");
var type_fixture_1 = require("./type.fixture");
var image_fixture_1 = require("./image.fixture");
var pass_fixture_1 = require("./pass.fixture");
var ticket_fixture_1 = require("./ticket.fixture");
var order_fixture_1 = require("./order.fixture");
var passage_fixture_1 = require("./passage.fixture");
var night_opening_fixture_1 = require("./night_opening.fixture");
function fillTables() {
    return __awaiter(this, void 0, void 0, function () {
        var jobFixture, roleFixture, userFixture, sessionFixture, maintainFixture, weekFixture, speciesFixture, raceFixture, healthcareFixture, typeFixture, imageFixture, areaFixture, animalFixture, locationFixture, conditionFixture, statusFixture, passFixture, ticketFixture, orderFixture, passageFixture, nightOpeningFixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, job_fixture_1.JobFixture.getInstance()];
                case 1:
                    jobFixture = _a.sent();
                    return [4 /*yield*/, role_fixture_1.RoleFixture.getInstance()];
                case 2:
                    roleFixture = _a.sent();
                    return [4 /*yield*/, user_fixture_1.UserFixture.getInstance()];
                case 3:
                    userFixture = _a.sent();
                    return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                case 4:
                    sessionFixture = _a.sent();
                    return [4 /*yield*/, maintain_fixture_1.MaintainFixture.getInstance()];
                case 5:
                    maintainFixture = _a.sent();
                    return [4 /*yield*/, week_fixture_1.WeekFixture.getInstance()];
                case 6:
                    weekFixture = _a.sent();
                    return [4 /*yield*/, species_fixture_1.SpeciesFixture.getInstance()];
                case 7:
                    speciesFixture = _a.sent();
                    return [4 /*yield*/, race_fixture_1.RaceFixture.getInstance()];
                case 8:
                    raceFixture = _a.sent();
                    return [4 /*yield*/, healthcare_fixture_1.HealthcareFixture.getInstance()];
                case 9:
                    healthcareFixture = _a.sent();
                    return [4 /*yield*/, type_fixture_1.TypeFixture.getInstance()];
                case 10:
                    typeFixture = _a.sent();
                    return [4 /*yield*/, image_fixture_1.ImageFixture.getInstance()];
                case 11:
                    imageFixture = _a.sent();
                    return [4 /*yield*/, area_fixture_1.AreaFixture.getInstance()];
                case 12:
                    areaFixture = _a.sent();
                    return [4 /*yield*/, animal_fixture_1.AnimalFixture.getInstance()];
                case 13:
                    animalFixture = _a.sent();
                    return [4 /*yield*/, location_fixture_1.LocationFixture.getInstance()];
                case 14:
                    locationFixture = _a.sent();
                    return [4 /*yield*/, condition_fixture_1.ConditionFixture.getInstance()];
                case 15:
                    conditionFixture = _a.sent();
                    return [4 /*yield*/, status_fixture_1.StatusFixture.getInstance()];
                case 16:
                    statusFixture = _a.sent();
                    return [4 /*yield*/, pass_fixture_1.PassFixture.getInstance()];
                case 17:
                    passFixture = _a.sent();
                    return [4 /*yield*/, ticket_fixture_1.TicketFixture.getInstance()];
                case 18:
                    ticketFixture = _a.sent();
                    return [4 /*yield*/, order_fixture_1.OrderFixture.getInstance()];
                case 19:
                    orderFixture = _a.sent();
                    return [4 /*yield*/, passage_fixture_1.PassageFixture.getInstance()];
                case 20:
                    passageFixture = _a.sent();
                    return [4 /*yield*/, night_opening_fixture_1.NightOpeningFixture.getInstance()];
                case 21:
                    nightOpeningFixture = _a.sent();
                    return [4 /*yield*/, jobFixture.fillTable()];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, roleFixture.fillTable()];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, userFixture.fillTable()];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, sessionFixture.fillTable()];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, weekFixture.fillTable()];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, speciesFixture.fillTable()];
                case 27:
                    _a.sent();
                    return [4 /*yield*/, raceFixture.fillTable()];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, healthcareFixture.fillTable()];
                case 29:
                    _a.sent();
                    return [4 /*yield*/, typeFixture.fillTable()];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, imageFixture.fillTable()];
                case 31:
                    _a.sent();
                    return [4 /*yield*/, areaFixture.fillTable()];
                case 32:
                    _a.sent();
                    return [4 /*yield*/, maintainFixture.fillTable()];
                case 33:
                    _a.sent();
                    return [4 /*yield*/, animalFixture.fillTable()];
                case 34:
                    _a.sent();
                    return [4 /*yield*/, locationFixture.fillTable()];
                case 35:
                    _a.sent();
                    return [4 /*yield*/, statusFixture.fillTable()];
                case 36:
                    _a.sent();
                    return [4 /*yield*/, conditionFixture.fillTable()];
                case 37:
                    _a.sent();
                    return [4 /*yield*/, passFixture.fillTable()];
                case 38:
                    _a.sent();
                    return [4 /*yield*/, ticketFixture.fillTable()];
                case 39:
                    _a.sent();
                    return [4 /*yield*/, orderFixture.fillTable()];
                case 40:
                    _a.sent();
                    return [4 /*yield*/, passageFixture.fillTable()];
                case 41:
                    _a.sent();
                    return [4 /*yield*/, nightOpeningFixture.fillTable()];
                case 42:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.fillTables = fillTables;
function destroyTablesElement() {
    return __awaiter(this, void 0, void 0, function () {
        var jobFixture, roleFixture, userFixture, sessionFixture, maintainFixture, speciesFixture, raceFixture, healthcareFixture, typeFixture, imageFixture, areaFixture, animalFixture, locationFixture, conditionFixture, statusFixture, passFixture, ticketFixture, orderFixture, passageFixture, nightOpeningFixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, job_fixture_1.JobFixture.getInstance()];
                case 1:
                    jobFixture = _a.sent();
                    return [4 /*yield*/, role_fixture_1.RoleFixture.getInstance()];
                case 2:
                    roleFixture = _a.sent();
                    return [4 /*yield*/, user_fixture_1.UserFixture.getInstance()];
                case 3:
                    userFixture = _a.sent();
                    return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                case 4:
                    sessionFixture = _a.sent();
                    return [4 /*yield*/, maintain_fixture_1.MaintainFixture.getInstance()];
                case 5:
                    maintainFixture = _a.sent();
                    return [4 /*yield*/, species_fixture_1.SpeciesFixture.getInstance()];
                case 6:
                    speciesFixture = _a.sent();
                    return [4 /*yield*/, race_fixture_1.RaceFixture.getInstance()];
                case 7:
                    raceFixture = _a.sent();
                    return [4 /*yield*/, healthcare_fixture_1.HealthcareFixture.getInstance()];
                case 8:
                    healthcareFixture = _a.sent();
                    return [4 /*yield*/, type_fixture_1.TypeFixture.getInstance()];
                case 9:
                    typeFixture = _a.sent();
                    return [4 /*yield*/, image_fixture_1.ImageFixture.getInstance()];
                case 10:
                    imageFixture = _a.sent();
                    return [4 /*yield*/, area_fixture_1.AreaFixture.getInstance()];
                case 11:
                    areaFixture = _a.sent();
                    return [4 /*yield*/, animal_fixture_1.AnimalFixture.getInstance()];
                case 12:
                    animalFixture = _a.sent();
                    return [4 /*yield*/, location_fixture_1.LocationFixture.getInstance()];
                case 13:
                    locationFixture = _a.sent();
                    return [4 /*yield*/, condition_fixture_1.ConditionFixture.getInstance()];
                case 14:
                    conditionFixture = _a.sent();
                    return [4 /*yield*/, status_fixture_1.StatusFixture.getInstance()];
                case 15:
                    statusFixture = _a.sent();
                    return [4 /*yield*/, pass_fixture_1.PassFixture.getInstance()];
                case 16:
                    passFixture = _a.sent();
                    return [4 /*yield*/, ticket_fixture_1.TicketFixture.getInstance()];
                case 17:
                    ticketFixture = _a.sent();
                    return [4 /*yield*/, order_fixture_1.OrderFixture.getInstance()];
                case 18:
                    orderFixture = _a.sent();
                    return [4 /*yield*/, passage_fixture_1.PassageFixture.getInstance()];
                case 19:
                    passageFixture = _a.sent();
                    return [4 /*yield*/, night_opening_fixture_1.NightOpeningFixture.getInstance()];
                case 20:
                    nightOpeningFixture = _a.sent();
                    return [4 /*yield*/, sessionFixture.destroyFieldsTable()];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, userFixture.destroyFieldsTable()];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, jobFixture.destroyFieldsTable()];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, roleFixture.destroyFieldsTable()];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, speciesFixture.destroyFieldsTable()];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, raceFixture.destroyFieldsTable()];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, healthcareFixture.destroyFieldsTable()];
                case 27:
                    _a.sent();
                    return [4 /*yield*/, typeFixture.destroyFieldsTable()];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, imageFixture.destroyFieldsTable()];
                case 29:
                    _a.sent();
                    return [4 /*yield*/, areaFixture.destroyFieldsTable()];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, maintainFixture.destroyFieldsTable()];
                case 31:
                    _a.sent();
                    return [4 /*yield*/, animalFixture.destroyFieldsTable()];
                case 32:
                    _a.sent();
                    return [4 /*yield*/, locationFixture.destroyFieldsTable()];
                case 33:
                    _a.sent();
                    return [4 /*yield*/, statusFixture.destroyFieldsTable()];
                case 34:
                    _a.sent();
                    return [4 /*yield*/, conditionFixture.destroyFieldsTable()];
                case 35:
                    _a.sent();
                    return [4 /*yield*/, passFixture.destroyFieldsTable()];
                case 36:
                    _a.sent();
                    return [4 /*yield*/, ticketFixture.destroyFieldsTable()];
                case 37:
                    _a.sent();
                    return [4 /*yield*/, orderFixture.destroyFieldsTable()];
                case 38:
                    _a.sent();
                    return [4 /*yield*/, passageFixture.destroyFieldsTable()];
                case 39:
                    _a.sent();
                    return [4 /*yield*/, nightOpeningFixture.destroyFieldsTable()];
                case 40:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.destroyTablesElement = destroyTablesElement;
