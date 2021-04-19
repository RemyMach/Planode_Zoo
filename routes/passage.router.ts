import express from "express";
import {PassageInstance} from "../models/passage.model";
import {PassageRepository} from "../repositories/passage.repository";
import {PassageController} from "../controllers/passage.controller";
import {AreaController} from "../controllers/area.controller";
import {TicketRepository} from "../repositories/ticket.repository";

const passageRouter = express.Router();

passageRouter.get("/", /*authMiddleware,*/ async function (req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const passageController = await PassageController.getInstance();
    const passage: PassageInstance[] = await passageController.getAllPassage(offset, limit);

    if (passage !== null) {
        res.status(200);
        res.json(passage);
    } else {
        res.status(404).end();
    }
});

passageRouter.get("/:id", /*authMiddleware,*/ async function (req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    let passage = await PassageRepository.getPassage(Number(id));

    if (passage !== null) {
        res.status(200);
        res.json(passage);
    } else {
        res.status(404).end();
    }
});

passageRouter.post("/", /*authMiddleware,*/ async function (req, res) {
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const area_id = req.body.area_id;
    const ticket_id = req.body.ticket_id;

    if (day === undefined || month === undefined || year === undefined || area_id === undefined || ticket_id === undefined) {
        res.status(401).end();
        return;
    }

    const ticket = await TicketRepository.getTicket(ticket_id);
    if (ticket === null) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.getArea(area_id, false);
    if (area === null) {
        res.status(400).end();
        return;
    }

    const passageController = await PassageController.getInstance();
    const date = await PassageRepository.fixDateType(new Date(year, month, day));
    const passage = await passageController.createPassage(date, ticket, area);

    if (passage !== null) {
        res.status(200);
        res.json(passage);
    } else {
        res.status(404).end();
    }
});

passageRouter.put("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const is_inside_the_area = req.body.is_inside_the_area;

    if (id === undefined) {
        res.status(401).end();
        return;
    }

    const passageController = await PassageController.getInstance();
    const passage = await passageController.updatePassage(id, new Date(year, month, day), is_inside_the_area);

    if (passage !== null) {
        res.status(200);
        res.json(passage);
    } else {
        res.status(404).end();
    }
});

passageRouter.delete("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;

    if (id === undefined) {
        res.status(401).end();
        return;
    }

    const passageController = await PassageController.getInstance();
    const passage = await passageController.deletePassage(id);

    if (passage) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

passageRouter.post("/enter", async function (req, res) {
    const ticket_id = req.body.ticket_id;
    const area_id = req.body.area_id;

    if (ticket_id === undefined || area_id === undefined) {
        res.status(401).end();
        return;
    }

    const ticket = await TicketRepository.getTicket(ticket_id);
    if (ticket === null) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.getArea(area_id, false);
    if (area === null) {
        res.status(400).end();
        return;
    }

    const passageController = await PassageController.getInstance();
    const passage = await passageController.userEnter(ticket, area);

    if (passage) {
        res.json(passage);
        res.status(200).end();
    } else {
        res.status(403).end();
    }
});

passageRouter.post("/leave", async function (req, res) {
    const ticket_id = req.body.ticket_id;
    const area_id = req.body.area_id;

    if (ticket_id === undefined || area_id === undefined) {
        res.status(401).end();
        return;
    }

    const ticket = await TicketRepository.getTicket(ticket_id);
    if (ticket === null) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.getArea(area_id, false);
    if (area === null) {
        res.status(400).end();
        return;
    }

    const passageController = await PassageController.getInstance();
    const passage = await passageController.userLeave(ticket, area);

    if (passage) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

passageRouter.get("/stats/actual", /*authMiddleware,*/ async function (req, res) {
    const stats = await PassageRepository.getRealTimeStats();
    if (stats !== null) {
        res.json(stats.length);
        res.status(200).end();
    } else {
        res.json(0);
        res.status(200).end();
    }
});

passageRouter.get("/stats/actual/:id", /*authMiddleware,*/ async function (req, res) {
    const stats = await PassageRepository.getRealTimeStatsByArea(Number(req.params.id));
    if (stats !== null) {
        res.json(stats.length);
        res.status(200).end();
    } else {
        res.json(0);
        res.status(200).end();
    }
});

export {
    passageRouter
};
