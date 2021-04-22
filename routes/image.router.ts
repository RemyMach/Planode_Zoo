import express from "express";
import {ImageController} from "../controllers/image.controller";
import {ImageInstance} from "../models/image.model";
import {AreaController} from "../controllers/area.controller";
import {AreaInstance} from "../models/area.model";
import {authMiddleware} from "../middlewares/auth.middleware";

const imageRouter = express.Router();

imageRouter.get("/all", authMiddleware, async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const imageController = await ImageController.getInstance();
    const image: ImageInstance[] = await imageController.getAll(offset, limit);

    if(image !== null) {
        res.status(200);
        res.json(image);
    }else {
        res.status(404).end();
    }
});

imageRouter.get("/:id", authMiddleware, async function(req, res) {
    const id = Number(req.params.id);

    if (id === undefined || isNaN(id)) {
        res.status(403).end();
        return;
    }

    const imageController = await ImageController.getInstance();
    const image = await imageController.getImageById(id);

    if(image !== null) {
        res.status(200);
        res.json(image);
    }else {
        res.status(404).end();
    }
});

imageRouter.put("/:id", authMiddleware, async function(req, res) {
    const image = req.body.image;

    if(image === undefined) {
        res.status(400).end();
        return;
    }

    const id = Number(req.params.id);
    if (id === undefined || isNaN(id)) {
        res.status(403).end();
        return;
    }

    const imageController = await ImageController.getInstance();
    const imageInstance = await imageController.updateImage(id,{
        image
    });

    if(imageInstance !== null) {
        res.status(200);
        res.json(imageInstance);
    }else {
        res.status(404).end();
    }
});

imageRouter.post("/", authMiddleware, async function(req, res) {
    const image = req.body.image;
    const areaId = Number(req.body.area_id);

    if (image === undefined) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    let area: AreaInstance | null = null;
    if (areaId !== undefined && !isNaN(areaId)) {
        area = await areaController.getArea(areaId, false);
    }

    const imageController = await ImageController.getInstance();
    const imageInstance = await imageController.createImage({
        image
    });

    if (imageInstance !== null) {
        if (area !== null) {
            await imageInstance.setArea(area);
        }
        res.status(200);
        res.json(imageInstance);
    } else {
        res.status(500).end();
    }
});

imageRouter.delete("/:id", authMiddleware, async function(req, res) {
    const id = Number(req.params.id);
    if (id === undefined || isNaN(id)) {
        res.status(400).end();
        return;
    }

    const imageController = await ImageController.getInstance();
    const image = await imageController.getImageById(id);

    if (image === null) {
        res.status(404).end();
        return;
    }

    const isImageDeleted = await imageController.deleteImage(id);

    if (isImageDeleted) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

export {
    imageRouter
};