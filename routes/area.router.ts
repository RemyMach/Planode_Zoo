import express from "express";
import {AreaController} from "../controllers/area.controller";
import {AreaInstance} from "../models/area.model";

const areaRouter = express.Router();

areaRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const details = req.query.details === "true";

    const areaController = await AreaController.getInstance();
    const areas: AreaInstance[] = await areaController.getAll(offset, limit, details);

    if(areas !== null) {
        res.status(200);
        res.json(areas);
    }else {
        res.status(404).end();
    }
});

areaRouter.get("/:id", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const id = Number(req.params.id);

    if (id === undefined || isNaN(id)) {
        res.status(403).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    let area = await areaController.getArea(id, details);

    if(area !== null) {
        res.status(200);
        res.json(area);
    }else {
        res.status(404).end();
    }
});

areaRouter.put("/", /*authMiddleware,*/ async function(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const surface = req.body.surface;
    const bestMonth = req.body.best_month;
    const visitorCapacity = req.body.visitor_capacity;
    const visitDuration = req.body.visit_duration;
    const disabledAccess = req.body.disabled_access;
    const openingTime = req.body.opening_time;
    const closingTime = req.body.closing_time;

    if(name === undefined && description === undefined && image === undefined && surface === undefined && bestMonth === undefined && disabledAccess === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.headers["id"];
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.updateArea(Number(id),{
        name,
        description,
        image,
        surface,
        best_month: bestMonth,
        visitor_capacity: visitorCapacity,
        visit_duration: visitDuration,
        disabled_access: disabledAccess,
        opening_time: openingTime,
        closing_time: closingTime
    });

    if(area !== null) {
        res.status(200);
        res.json(area);
    }else {
        res.status(404).end();
    }
});

areaRouter.post("/", /*authMiddleware,*/ async function(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const surface = req.body.surface;
    const bestMonth = req.body.best_month;
    const visitorCapacity = req.body.visitor_capacity;
    const visitDuration = req.body.visit_duration;
    const disabledAccess = req.body.disabled_access;
    const openingTime = req.body.opening_time;
    const closingTime = req.body.closing_time;

    if (name === undefined || description === undefined || image === undefined || surface === undefined || bestMonth === undefined || disabledAccess === undefined) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.createArea({
        name,
        description,
        image,
        surface,
        best_month: bestMonth,
        visitor_capacity: visitorCapacity,
        visit_duration: visitDuration,
        disabled_access: disabledAccess,
        opening_time: openingTime,
        closing_time: closingTime
    });

    if (area !== null) {
        res.status(200);
        res.json(area);
    } else {
        res.status(500).end();
    }
});

areaRouter.delete("/", /*authMiddleware,*/ async function(req, res) {
    const id = req.headers["id"];
    if (id === undefined) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.getArea(Number(id), false);

    if (area === null) {
        res.status(404).end();
        return;
    }

    const isAreaDeleted = await areaController.deleteArea(Number(id));

    if (isAreaDeleted) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

export {
    areaRouter
};