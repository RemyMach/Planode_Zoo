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
exports.SequelizeManager = void 0;
var sequelize_1 = require("sequelize");
var user_model_1 = __importDefault(require("./user.model"));
var session_model_1 = __importDefault(require("./session.model"));
var role_model_1 = __importDefault(require("./role.model"));
var job_model_1 = __importDefault(require("./job.model"));
var species_model_1 = __importDefault(require("./species.model"));
var race_model_1 = __importDefault(require("./race.model"));
var animal_model_1 = __importDefault(require("./animal.model"));
var healthcare_model_1 = __importDefault(require("./healthcare.model"));
var location_model_1 = __importDefault(require("./location.model"));
var image_model_1 = __importDefault(require("./image.model"));
var area_model_1 = __importDefault(require("./area.model"));
var type_model_1 = __importDefault(require("./type.model"));
var week_model_1 = __importDefault(require("./week.model"));
var presence_model_1 = __importDefault(require("./presence.model"));
var condition_model_1 = __importDefault(require("./condition.model"));
var status_model_1 = __importDefault(require("./status.model"));
var maintain_model_1 = __importDefault(require("./maintain.model"));
var pass_model_1 = __importDefault(require("./pass.model"));
var ticket_model_1 = __importDefault(require("./ticket.model"));
var order_model_1 = __importDefault(require("./order.model"));
var passage_model_1 = __importDefault(require("./passage.model"));
var night_opening_model_1 = __importDefault(require("./night_opening.model"));
var SequelizeManager = /** @class */ (function () {
    function SequelizeManager(props) {
        this.sequelize = props.sequelize;
        this.user = props.user;
        this.session = props.session;
        this.role = props.role;
        this.job = props.job;
        this.week = props.week;
        this.presence = props.presence;
        this.maintain = props.maintain;
        this.species = props.species;
        this.race = props.race;
        this.animal = props.animal;
        this.healthcare = props.healthcare;
        this.location = props.location;
        this.image = props.image;
        this.area = props.area;
        this.type = props.type;
        this.condition = props.condition;
        this.status = props.status;
        this.pass = props.pass;
        this.ticket = props.ticket;
        this.order = props.order;
        this.passage = props.passage;
        this.night_opening = props.night_opening;
    }
    SequelizeManager.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(SequelizeManager.instance === undefined)) return [3 /*break*/, 2];
                        _a = SequelizeManager;
                        return [4 /*yield*/, SequelizeManager.initialize()];
                    case 1:
                        _a.instance = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, SequelizeManager.instance];
                }
            });
        });
    };
    SequelizeManager.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, managerProps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = new sequelize_1.Sequelize({
                            dialect: process.env.DB_DRIVER,
                            host: process.env.DB_HOST,
                            database: process.env.DB_NAME,
                            username: process.env.DB_USER,
                            password: process.env.DB_PASSWORD,
                            port: Number.parseInt(process.env.DB_PORT)
                        });
                        return [4 /*yield*/, sequelize.authenticate()];
                    case 1:
                        _a.sent();
                        managerProps = {
                            sequelize: sequelize,
                            user: user_model_1.default(sequelize),
                            session: session_model_1.default(sequelize),
                            role: role_model_1.default(sequelize),
                            job: job_model_1.default(sequelize),
                            week: week_model_1.default(sequelize),
                            presence: presence_model_1.default(sequelize),
                            maintain: maintain_model_1.default(sequelize),
                            species: species_model_1.default(sequelize),
                            race: race_model_1.default(sequelize),
                            animal: animal_model_1.default(sequelize),
                            healthcare: healthcare_model_1.default(sequelize),
                            location: location_model_1.default(sequelize),
                            image: image_model_1.default(sequelize),
                            area: area_model_1.default(sequelize),
                            type: type_model_1.default(sequelize),
                            condition: condition_model_1.default(sequelize),
                            status: status_model_1.default(sequelize),
                            pass: pass_model_1.default(sequelize),
                            ticket: ticket_model_1.default(sequelize),
                            order: order_model_1.default(sequelize),
                            passage: passage_model_1.default(sequelize),
                            night_opening: night_opening_model_1.default(sequelize)
                        };
                        SequelizeManager.associate(managerProps);
                        return [4 /*yield*/, sequelize.sync()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new SequelizeManager(managerProps)];
                }
            });
        });
    };
    SequelizeManager.associate = function (props) {
        props.user.hasMany(props.session); // User N Session
        props.session.belongsTo(props.user, { foreignKey: 'user_id' }); // Session 1 User
        //props.user.belongsToMany(props.role, { through: 'User_Role' });
        //props.role.belongsToMany(props.user, { through: 'User_Role' });
        props.user.belongsTo(props.role, { foreignKey: 'role_id' }); // User 1 Role
        props.role.hasMany(props.user); // Role 1 User
        props.job.hasMany(props.user); // Job N User
        props.user.belongsTo(props.job, { foreignKey: 'job_id' }); // User 1 Job
        props.user.belongsToMany(props.week, { through: props.presence, foreignKey: 'user_id' });
        props.week.belongsToMany(props.user, { through: props.presence, foreignKey: 'week_id' });
        props.maintain.belongsToMany(props.user, { through: 'User_Maintain', foreignKey: 'maintain_id' });
        props.user.belongsToMany(props.maintain, { through: 'User_Maintain', foreignKey: 'user_id' });
        props.maintain.belongsTo(props.area, { foreignKey: 'area_id' });
        props.area.hasMany(props.maintain, { foreignKey: 'area_id' });
        //Association for species table
        props.species.hasMany(props.race);
        //Association for race table
        props.race.belongsTo(props.species, { foreignKey: 'species_id' });
        props.race.hasMany(props.animal);
        //Association for animal table
        props.animal.belongsTo(props.race, { foreignKey: 'race_id' });
        props.animal.hasMany(props.healthcare);
        props.animal.hasOne(props.location);
        //Association for healthcare table
        props.healthcare.belongsTo(props.animal, { foreignKey: 'animal_id' });
        //Association for location table
        props.location.belongsTo(props.area, { foreignKey: 'area_id' });
        props.location.belongsTo(props.animal, { foreignKey: 'animal_id' });
        //Association for image table
        props.image.belongsTo(props.area, { foreignKey: 'area_id' });
        //Association for area table
        props.area.hasMany(props.location);
        props.area.hasMany(props.image);
        props.area.belongsTo(props.type, { foreignKey: 'type_id' });
        props.area.hasMany(props.condition);
        props.area.hasMany(props.passage);
        props.area.hasMany(props.order);
        //Associations for table type
        props.type.hasMany(props.area);
        //Associations for status table
        props.status.hasMany(props.condition);
        //Associations for condition table
        props.condition.belongsTo(props.area, { foreignKey: 'area_id' });
        props.condition.belongsTo(props.status, { foreignKey: 'status_id' });
        //Associations for pass table
        props.pass.hasMany(props.ticket);
        props.pass.hasMany(props.order);
        //Associations for ticket table
        props.ticket.belongsTo(props.pass, { foreignKey: 'pass_id' });
        props.ticket.hasMany(props.passage);
        //Associations for order table
        props.order.belongsTo(props.pass, { foreignKey: 'pass_id' });
        props.order.belongsTo(props.area, { foreignKey: 'area_id' });
        //Associations for passage table
        props.passage.belongsTo(props.area, { foreignKey: 'area_id' });
        props.passage.belongsTo(props.ticket, { foreignKey: 'ticket_id' });
    };
    return SequelizeManager;
}());
exports.SequelizeManager = SequelizeManager;
