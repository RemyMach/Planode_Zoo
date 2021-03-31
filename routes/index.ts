import {Express} from "express";
import {authRouter} from './auth.router';
import {jobRouter} from "./job.router";
import {userRouter} from './user.router';
import {roleRouter} from './role.router';

export function buildRoutes(app: Express) {

    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/job", jobRouter);
    app.use("/role", roleRouter);
}