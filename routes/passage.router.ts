import express from "express";
import {PassageInstance} from "../models/passage.model";
import {PassageRepository} from "../repositories/passage.repository";
import {PassageController} from "../controllers/passage.controller";
import {AreaController} from "../controllers/area.controller";
import {TicketRepository} from "../repositories/ticket.repository";
import {WeekRepository} from "../repositories/week.repository";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";

const passageRouter = express.Router();

passageRouter.get("/", adminAuthMiddleware, async function (req, res) {
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

passageRouter.get("/:id", adminAuthMiddleware, async function (req, res) {
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

passageRouter.post("/", adminAuthMiddleware, async function (req, res) {
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

passageRouter.put("/", adminAuthMiddleware, async function (req, res) {
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
    const date = await PassageRepository.fixDateType(new Date(year, month, day));
    const passage = await passageController.updatePassage(id, date, is_inside_the_area);

    if (passage !== null) {
        res.status(200);
        res.json(passage);
    } else {
        res.status(404).end();
    }
});

passageRouter.delete("/", adminAuthMiddleware, async function (req, res) {
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

passageRouter.get("/stats/actual", adminAuthMiddleware, async function (req, res) {
    const stats = await PassageRepository.getRealTimeStats();
    if (stats !== null) {
        res.json(stats.length);
        res.status(200).end();
    } else {
        res.json(0);
        res.status(200).end();
    }
});

passageRouter.get("/stats/actual/:id", adminAuthMiddleware, async function (req, res) {
    const stats = await PassageRepository.getRealTimeStatsByArea(Number(req.params.id));
    if (stats !== null) {
        res.json(stats.length);
        res.status(200).end();
    } else {
        res.json(0);
        res.status(200).end();
    }
});

passageRouter.get("/stats/daily/:id", adminAuthMiddleware, async function (req, res) {
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;

    if(day === undefined || month === undefined || year === undefined){
        res.status(401).end();
        return;
    }

    const date = await PassageRepository.fixDateType(new Date(year, month, day));

    const stats = await PassageRepository.getAreaStatsByDay(Number(req.params.id), date);
    if (stats !== null) {
        res.json(stats.length);
        res.status(200).end();
    } else {
        res.json(0);
        res.status(200).end();
    }
});

passageRouter.get("/stats/daily", adminAuthMiddleware, async function (req, res) {
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;

    if(day === undefined || month === undefined || year === undefined){
        res.status(401).end();
        return;
    }

    const date = await PassageRepository.fixDateType(new Date(year, month, day));

    const stats = await PassageRepository.getStatsByDay(date);
    if (stats !== null) {
        res.json(stats.length);
        res.status(200).end();
    } else {
        res.json(0);
        res.status(200).end();
    }
});

passageRouter.get("/stats/weekly/:id", adminAuthMiddleware, async function (req, res) {
    const week_id = req.body.week_id;

    if(week_id === undefined){
        res.status(401).end();
        return;
    }

    const week = await WeekRepository.getWeekById(week_id);
    if(week === null){
        res.status(404).end();
        return;
    }

    const stats = await PassageRepository.getAreaStatsByWeek(Number(req.params.id), week);
    if (stats !== null) {
        res.json(stats.length);
        res.status(200).end();
    } else {
        res.json(0);
        res.status(200).end();
    }
});

passageRouter.get("/stats/weekly", adminAuthMiddleware, async function (req, res) {
    const week_id = req.body.week_id;

    if(week_id === undefined){
        res.status(401).end();
        return;
    }

    const week = await WeekRepository.getWeekById(week_id);
    if(week === null){
        res.status(404).end();
        return;
    }

    const stats = await PassageRepository.getStatsByWeek(week);
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
