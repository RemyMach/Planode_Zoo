import express from "express";
import {TypeController} from "../controllers/type.controller";
import {TypeInstance} from "../models/type.model";
import {authMiddleware} from "../middlewares/auth.middleware";

const typeRouter = express.Router();

typeRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const details = req.query.details === "true";

    const typeController = await TypeController.getInstance();
    let types: TypeInstance[] = await typeController.getAll(offset, limit, details);

    if(types !== null) {
        res.status(200);
        res.json(types);
    }else {
        res.status(404).end();
    }
});

typeRouter.get("/:scrap", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const scrap = req.params.scrap;

    if (scrap === undefined) {
        res.status(403).end();
        return;
    }

    const id: number | undefined = isNaN(Number(scrap)) ? undefined : Number(scrap);
    const name: string | undefined = scrap;

    const typeController = await TypeController.getInstance();
    let type: TypeInstance | null = null;

    if (id !== undefined) {
        type = await typeController.getTypeById(id, details);
    } else if (name !== undefined) {
        type = await typeController.getTypeByName(name.toString(), details);
    }

    if(type !== null) {
        res.status(200);
        res.json(type);
    }else {
        res.status(404).end();
    }
});

typeRouter.put("/:id", authMiddleware, async function(req, res) {
    const name = req.body.name;

    if(name === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const typeController = await TypeController.getInstance();
    const type = await typeController.updateType(Number(id),{
        name
    });

    if(type !== null) {
        res.status(200);
        res.json(type);
    }else {
        res.status(404).end();
    }
});

typeRouter.post("/", authMiddleware, async function(req, res) {
    const name = req.body.name;

    if (name === undefined) {
        res.status(400).end();
        return;
    }

    const typeController = await TypeController.getInstance();
    const type = await typeController.createType({
        name
    });

    if (type !== null) {
        res.status(200);
        res.json(type);
    } else {
        res.status(500).end();
    }
});

typeRouter.delete("/:id", authMiddleware, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
        return;
    }

    const typeController = await TypeController.getInstance();
    const type = await typeController.getTypeById(Number(id), false);

    if (type === null) {
        res.status(404).end();
        return;
    }

    const isTypeDeleted = await typeController.deleteType(Number(id));

    if (isTypeDeleted) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

export {
    typeRouter
};