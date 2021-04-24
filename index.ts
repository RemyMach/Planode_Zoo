import express, {Express} from "express";
import {buildRoutes} from "./routes";
import {destroyTablesElement, fillTables} from "./tests/fixtures";

const app: Express = express();

app.use(express.json());
/*async function main(): Promise<void> {
    await destroyTablesElement();
    await fillTables();
}
main();*/

buildRoutes(app);

console.log(process.env.PORT);
console.log(process.env.DB_HOST);
console.log(process.env.DB_DRIVER);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_USER);
console.log(process.env.JWT_SECRET);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));
