import {Express} from "express";
import {authRouter} from './auth.router';
import {userRouter} from './user.router';
import {animalRouter} from "./animal.router";
import {areaRouter} from "./area.router";

export function buildRoutes(app: Express) {

    app.use("/auth", authRouter);
    app.use("/user", userRouter);

    app.use("/animal", animalRouter);
    app.use("/area", areaRouter);
}