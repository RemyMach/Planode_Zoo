import express from "express";
import {StatusInstance} from "../models/status.model";
import {StatusRepository} from "../repositories/status.repository";
import {StatusController} from "../controllers/status.controller";

const statusRouter = express.Router();

statusRouter.get("/", /*authMiddleware,*/ async function (req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const statusController = await StatusController.getInstance();
    const status: StatusInstance[] = await statusController.getAllStatus(offset, limit);

    if (status !== null) {
        res.status(200);
        res.json(status);
    } else {
        res.status(404).end();
    }
});

statusRouter.get("/:id", /*authMiddleware,*/ async function (req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    let status = await StatusRepository.getStatus(Number(id));

    if (status !== null) {
        res.status(200);
        res.json(status);
    } else {
        res.status(404).end();
    }
});

export {
    statusRouter
};
