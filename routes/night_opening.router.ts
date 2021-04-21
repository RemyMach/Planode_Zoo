import express from "express";
import {NightOpeningInstance} from "../models/night_opening.model";
import {NightOpeningRepository} from "../repositories/night_opening.repository";
import {NightOpeningController} from "../controllers/night_opening.controller";

const nightOpeningRouter = express.Router();

nightOpeningRouter.get("/", /*authMiddleware,*/ async function (req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const night_opening_controller = await NightOpeningController.getInstance();
    const night_opening: NightOpeningInstance[] = await night_opening_controller.getAllNightOpening(offset, limit);

    if (night_opening !== null) {
        res.status(200);
        res.json(night_opening);
    } else {
        res.status(404).end();
    }
});

nightOpeningRouter.get("/:id", /*authMiddleware,*/ async function (req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    let night_opening = await NightOpeningRepository.getNightOpening(Number(id));

    if (night_opening !== null) {
        res.status(200);
        res.json(night_opening);
    } else {
        res.status(404).end();
    }
});

nightOpeningRouter.post("/", /*authMiddleware,*/ async function (req, res) {
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;

    const hour = req.body.hour;
    const minute = req.body.minute;

    if (day === undefined || month === undefined || year === undefined || hour === undefined || minute === undefined) {
        res.status(401).end();
        return;
    }

    const new_closing_date = new Date();
    new_closing_date.setUTCHours(hour, minute, 0);

    const night_opening_controller = await NightOpeningController.getInstance();
    const night_opening = await night_opening_controller.createNightOpening(new_closing_date);

    if (night_opening !== null) {
        res.status(200);
        res.json(night_opening);
    } else {
        res.status(404).end();
    }
});

nightOpeningRouter.put("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;

    const hour = req.body.hour;
    const minute = req.body.minute;

    if (id === undefined || day === undefined || month === undefined || year === undefined || hour === undefined || minute === undefined) {
        res.status(401).end();
        return;
    }

    const new_closing_date = new Date();
    new_closing_date.setUTCHours(hour, minute, 0);

    const night_opening_controller = await NightOpeningController.getInstance();
    const night_opening = await night_opening_controller.updateNightOpening(id, new_closing_date);

    if (night_opening !== null) {
        res.status(200);
        res.json(night_opening);
    } else {
        res.status(404).end();
    }
});

nightOpeningRouter.delete("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;

    if (id === undefined ) {
        res.status(401).end();
        return;
    }

    const nightOpeningController = await NightOpeningController.getInstance();
    const nightOpening = await nightOpeningController.deleteNightOpening(id);

    if (nightOpening) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

export {
    nightOpeningRouter
};
