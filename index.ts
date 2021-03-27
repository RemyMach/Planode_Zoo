import express, {Express} from "express";


const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));