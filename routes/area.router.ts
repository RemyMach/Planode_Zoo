import express from "express";
import {AreaController} from "../controllers/area.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {AreaInstance} from "../models/area.model";

const areaRouter = express.Router();

areaRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
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

areaRouter.get("/:id/maintain", authMiddleware, async function(req, res) {

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

areaRouter.get("/maintain/all", authMiddleware, async function(req, res) {

    //const start_date = req.query.start_date ? req.query.start_date as string: null ;

    const areaController = await AreaController.getInstance();
    let area = await areaController.getAllAreaInMaintain();

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
    const best_month = req.body.best_month;
    const disabled_access = req.body.disabled_access;

    if(name === undefined && description === undefined && image === undefined && surface === undefined && best_month === undefined && disabled_access === undefined) {
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
        best_month,
        disabled_access
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