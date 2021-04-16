import {Express} from "express";
import {authRouter} from './auth.router';
import {jobRouter} from "./job.router";
import {userRouter} from './user.router';
import {roleRouter} from './role.router';
import {weekRouter} from './week.router';
import {animalRouter} from "./animal.router";
import {areaRouter} from "./area.router";
import {conditionRouter} from "./condition.router";
import {statusRouter} from "./status.route";
import {presenceRouter} from "./presence.router";
import {raceRouter} from "./race.router";
import {speciesRouter} from "./species.router";
import {healthcareRouter} from "./healthcare.router";
import {locationRouter} from "./location.router";
import {maintainRouter} from "./maintain.routes";
import {typeRouter} from "./type.router";
import {imageRouter} from "./image.router";
import {passRouter} from "./pass.router";

export function buildRoutes(app: Express) {

    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/job", jobRouter);
    app.use("/role", roleRouter);
    app.use("/week", weekRouter);
    app.use("/presence", presenceRouter);
    app.use("/maintain", maintainRouter);

    app.use("/animal", animalRouter);
    app.use("/area", areaRouter);
    app.use("/healthcare", healthcareRouter);
    app.use("/location", locationRouter);
    app.use("/species", speciesRouter);
    app.use("/race", raceRouter);
    app.use("/type", typeRouter);
    app.use("/image", imageRouter);

    app.use("/condition", conditionRouter);
    app.use("/status", statusRouter);
    app.use("/pass", passRouter);
}
