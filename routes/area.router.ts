import express from "express";
import {AreaController} from "../controllers/area.controller";
import {AreaInstance} from "../models/area.model";
const areaRouter = express.Router();

areaRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const areaController = await AreaController.getInstance();
    const areas: AreaInstance[] = await areaController.getAll(offset, limit);

    if(areas !== null) {
        res.status(200);
        res.json(areas);
    }else {
        res.status(404).end();
    }
});

areaRouter.get("/", /*authMiddleware,*/ async function(req, res) {
    const id = req.headers["id"];
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    let area = await areaController.getArea(Number(id));

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
    const surface = req.body.surface;

    if(name === undefined && description === undefined && surface === undefined) {
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
        surface
    });

    if(area !== null) {
        res.status(200);
        res.json(area);
    }else {
        res.status(404).end();
    }
});

export {
    areaRouter
};