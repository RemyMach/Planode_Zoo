"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var app = express_1.default();
app.use(express_1.default.json());
/*async function main(): Promise<void> {
    await destroyTablesElement();
    await fillTables();
}
main();*/
routes_1.buildRoutes(app);
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("Listening on " + port); });
