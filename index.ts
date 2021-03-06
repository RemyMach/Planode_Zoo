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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));
