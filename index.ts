import express, {Express} from "express";
import {buildRoutes} from "./routes";
import { SequelizeManager } from "./models";

const app: Express = express();

/*app.use(express.json());
async function main(): Promise<void> {
    const manager = await SequelizeManager.getInstance();
}

main();*/

buildRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));