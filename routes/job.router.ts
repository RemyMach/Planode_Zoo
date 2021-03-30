import express from "express";
import { JobController } from "../controllers/job.controller";
import { UserController } from "../controllers/user.controller";
import {adminAuthMiddleware, authMiddleware, superAdminAuthMiddleware} from "../middlewares/auth.middleware";
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

jobRouter.get("/user", adminAuthMiddleware, async function(req, res) {

    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const jobController = await JobController.getInstance();
    const jobs: JobInstance[] = await jobController.getAllJobsWithUsers(offset, limit);

    if(jobs !== null) {
        res.status(200);
        res.json(jobs);
    }else {
        res.status(404).end();
    }

});

jobRouter.post("/", superAdminAuthMiddleware, async function(req, res) {

    const label_job = req.body.job;

    if(label_job === undefined) {
        res.status(404).end();
    }

    const jobController = await JobController.getInstance();
    const job: JobInstance | null = await jobController.createJob(label_job);

    if(job !== null) {
        res.status(201);
        res.json(job);
    }else {
        res.status(404).end();
    }
});

jobRouter.put("/:id", superAdminAuthMiddleware, async function(req, res) {

    const label = req.body.new_label;
    const id_job = req.params.id !== undefined ? Number.parseInt(req.params.id): undefined;
    if(label === undefined || id_job === undefined) {
        res.status(400).end();
        return;
    }

    const jobController = await JobController.getInstance();
    const job: JobInstance | null = await jobController.updateJob(id_job, {
        label
    });

    if(job !== null) {
        res.status(200);
        res.json(job);
    }else {
        res.status(404).end();
    }
});

export {
    jobRouter
};
