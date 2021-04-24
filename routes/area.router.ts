import express from "express";
import {AreaController} from "../controllers/area.controller";
import { adminAuthMiddleware } from "../middlewares/auth.middleware";
import {AreaInstance} from "../models/area.model";
import {ImageController} from "../controllers/image.controller";
import {TypeController} from "../controllers/type.controller";

const areaRouter = express.Router();

areaRouter.get("/all", adminAuthMiddleware, async function(req, res) {
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

areaRouter.get("/:id", adminAuthMiddleware, async function(req, res) {
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

areaRouter.get("/:id/maintain", adminAuthMiddleware, async function(req, res) {

    const start_date = req.query.start_date ? req.query.start_date as string: null ;
    const area_id: number | undefined = req.params.id !== undefined ? Number.parseInt(req.params.id as string) : undefined;

    if(area_id === undefined) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    let area = await areaController.getAllMaintains(area_id, start_date);

    if(area !== null) {
        res.status(200);
        res.json(area);
    }else {
        res.status(404).end();
    }
});

areaRouter.get("/maintain/all", adminAuthMiddleware, async function(req, res) {

    const date = req.query.date ? req.query.date as string: null ;
    
    const areaController = await AreaController.getInstance();
    let area = await areaController.getAllAreaInMaintain(date);

    if(area !== null) {
        res.status(200);
        res.json(area).end();
    }else {
        res.status(404).end();
    }
});




areaRouter.put("/:id", adminAuthMiddleware, async function(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const surface = req.body.surface;
    const bestMonth = req.body.best_month;
    const visitorCapacity = req.body.visitor_capacity;
    const visitDuration = req.body.visit_duration;
    const disabledAccess = req.body.disabled_access;
    const openingTime = req.body.opening_time;
    const closingTime = req.body.closing_time;

    if(name === undefined && description === undefined && surface === undefined && bestMonth === undefined && disabledAccess === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.updateArea(Number(id),{
        name,
        description,
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

areaRouter.post("/", adminAuthMiddleware, async function(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const typeId = Number.parseInt(req.body.type_id);
    const surface = req.body.surface;
    const bestMonth = req.body.best_month;
    const visitorCapacity = req.body.visitor_capacity;
    const visitDuration = req.body.visit_duration;
    const disabledAccess = req.body.disabled_access;
    const openingTime = req.body.opening_time;
    const closingTime = req.body.closing_time;

    if (name === undefined || description === undefined || image === undefined || surface === undefined || bestMonth === undefined || disabledAccess === undefined || typeId === undefined || isNaN(typeId)) {
        res.status(400).end();
        return;
    }

    const imageController = await ImageController.getInstance();
    const imageInstance = await imageController.createImage({
        image
    });

    if (imageInstance === null) {
        res.status(500).end();
        return;
    }

    const typeController = await TypeController.getInstance();
    const typeInstance = await typeController.getTypeById(typeId, false);

    if (typeInstance === null) {
        res.status(500).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.createArea({
        name,
        description,
        surface,
        best_month: bestMonth,
        visitor_capacity: visitorCapacity,
        visit_duration: visitDuration,
        disabled_access: disabledAccess,
        opening_time: openingTime,
        closing_time: closingTime
    });

    if (area !== null) {
        await imageInstance.setArea(area);
        await area.setType(typeInstance);
        res.status(200);
        res.json(area);
    } else {
        res.status(500).end();
    }
});

areaRouter.delete("/:id", adminAuthMiddleware, async function(req, res) {
    const id = req.params.id;
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