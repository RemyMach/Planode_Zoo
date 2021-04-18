import express from "express";
import {TicketInstance} from "../models/ticket.model";
import {TicketRepository} from "../repositories/ticket.repository";
import {TicketController} from "../controllers/ticket.controller";
import {PassRepository} from "../repositories/pass.repository";

const ticketRouter = express.Router();

ticketRouter.get("/", /*authMiddleware,*/ async function (req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const ticketController = await TicketController.getInstance();
    const ticket: TicketInstance[] = await ticketController.getAllTicket(offset, limit);

    if (ticket !== null) {
        res.status(200);
        res.json(ticket);
    } else {
        res.status(404).end();
    }
});

ticketRouter.get("/:id", /*authMiddleware,*/ async function (req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    let ticket = await TicketRepository.getTicket(Number(id));

    if (ticket !== null) {
        res.status(200);
        res.json(ticket);
    } else {
        res.status(404).end();
    }
});

ticketRouter.post("/", /*authMiddleware,*/ async function (req, res) {
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const pass_id = req.body.pass_id;

    if (day === undefined || month === undefined || year === undefined) {
        res.status(401).end();
        return;
    }

    const pass = await PassRepository.getPass(pass_id);
    if (pass === null) {
        res.status(400).end();
        return;
    }

    const ticketController = await TicketController.getInstance();
    const ticket = await ticketController.createTicket(new Date(year, month, day), pass);

    if (ticket !== null) {
        res.status(200);
        res.json(ticket);
    } else {
        res.status(404).end();
    }
});

ticketRouter.put("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;

    if (id === undefined || day === undefined || month === undefined || year === undefined) {
        res.status(401).end();
        return;
    }

    const ticketController = await TicketController.getInstance();
    const ticket = await ticketController.updateTicket(id, new Date(year, month, day));

    if (ticket !== null) {
        res.status(200);
        res.json(ticket);
    } else {
        res.status(404).end();
    }
});

ticketRouter.delete("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;

    if (id === undefined) {
        res.status(401).end();
        return;
    }

    const ticketController = await TicketController.getInstance();
    const ticket = await ticketController.deleteTicket(id);

    if (ticket) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

export {
    ticketRouter
};
