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
    const areaId = req.body.areaId;
    const statusId = req.body.statusId;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;

    if (areaId === undefined || statusId === undefined || year === undefined || month === undefined || day === undefined) {
        res.status(401).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.getArea(areaId);
    if (area === null) {
        res.status(400).end();
        return;
    }
    const status = await StatusRepository.getStatus(statusId);
    if (status === null) {
        res.status(400).end();
        return;
    }

    const conditionController = await ConditionController.getInstance();
    const condition = await conditionController.addStatusToArea(area, status, {date: new Date(year, month, day)});

    if (condition !== null) {
        res.status(200);
        res.json(condition);
    } else {
        res.status(404).end();
    }
});

export {
    conditionRouter
};
