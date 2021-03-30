import express from "express";
import { JobController } from "../controllers/job.controller";
import { UserController } from "../controllers/user.controller";
import {adminAuthMiddleware, authMiddleware} from "../middlewares/auth.middleware";
import { JobInstance } from "../models/job.model";
import { UserInstance } from "../models/user.model";

const jobRouter = express.Router();

jobRouter.get("/all", adminAuthMiddleware, async function(req, res) {

    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const jobController = await JobController.getInstance();
    const jobs: JobInstance[] = await jobController.getAll(offset, limit);

    if(jobs !== null) {
        res.status(200);
        res.json(jobs);
    }else {
        res.status(404).end();
    }

});

export {
    jobRouter
};
