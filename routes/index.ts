import {Express} from "express";
import {authRouter} from './auth.router';
import {jobRouter} from "./job.router";
import {userRouter} from './user.router';
import {roleRouter} from './role.router';
import {weekRouter} from './week.router';
import {animalRouter} from "./animal.router";
import {areaRouter} from "./area.router";
import {presenceRouter} from "./presence.router";
import {raceRouter} from "./race.router";
import {speciesRouter} from "./species.router";
import {healthcareRouter} from "./healthcare.router";

export function buildRoutes(app: Express) {

    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/job", jobRouter);
    app.use("/role", roleRouter);
    app.use("/week", weekRouter);
    app.use("/presence", presenceRouter);

    app.use("/animal", animalRouter);
    app.use("/area", areaRouter);
    app.use("/race", raceRouter);
    app.use("/species", speciesRouter);
    app.use("/healthcare", healthcareRouter);
}