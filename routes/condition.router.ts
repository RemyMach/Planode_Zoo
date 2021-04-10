import express from "express";
import {ConditionController} from "../controllers/condition.controller";
import {ConditionInstance} from "../models/condition.model";
import {ConditionRepository} from "../repositories/condition.repository";
import {AreaController} from "../controllers/area.controller";
import {StatusRepository} from "../repositories/status.repository";

const conditionRouter = express.Router();

conditionRouter.get("/", /*authMiddleware,*/ async function (req, res) {
    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const conditionController = await ConditionController.getInstance();
    const conditions: ConditionInstance[] = await conditionController.getAllConditions(offset, limit);

    if (conditions !== null) {
        res.status(200);
        res.json(conditions);
    } else {
        res.status(404).end();
    }
});

conditionRouter.get("/:id", /*authMiddleware,*/ async function (req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    let condition = await ConditionRepository.getCondition(Number(id));

    if (condition !== null) {
        res.status(200);
        res.json(condition);
    } else {
        res.status(404).end();
    }
});

conditionRouter.post("/", /*authMiddleware,*/ async function (req, res) {
    const area_id = req.body.area_id;
    const status_id = req.body.status_id;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;

    if (area_id === undefined || status_id === undefined || year === undefined || month === undefined || day === undefined) {
        res.status(401).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.getArea(area_id, false);
    if (area === null) {
        res.status(400).end();
        return;
    }
    const status = await StatusRepository.getStatus(status_id);
    if (status === null) {
        res.status(400).end();
        return;
    }

    const conditionController = await ConditionController.getInstance();
    const condition = await conditionController.addStatusToArea(area, status, new Date(year, month, day));

    if (condition !== null) {
        res.status(200);
        res.json(condition);
    } else {
        res.status(404).end();
    }
});

conditionRouter.put("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;

    if (id === undefined || year === undefined || month === undefined || day === undefined) {
        res.status(401).end();
        return;
    }

    const conditionController = await ConditionController.getInstance();
    const condition = await conditionController.updateCondition(id, new Date(year, month, day));

    if (condition !== null) {
        res.status(200);
        res.json(condition);
    } else {
        res.status(404).end();
    }
});

conditionRouter.delete("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;

    if (id === undefined ) {
        res.status(401).end();
        return;
    }

    const conditionController = await ConditionController.getInstance();
    const condition = await conditionController.deleteCondition(id);

    if (condition) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

export {
    conditionRouter
};
