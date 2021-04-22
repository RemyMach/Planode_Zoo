import express from "express";
import {PassInstance} from "../models/pass.model";
import {PassRepository} from "../repositories/pass.repository";
import {PassController} from "../controllers/pass.controller";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";

const passRouter = express.Router();

passRouter.get("/", adminAuthMiddleware, async function (req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const passController = await PassController.getInstance();
    const pass: PassInstance[] = await passController.getAllPass(offset, limit);

    if (pass !== null) {
        res.status(200);
        res.json(pass);
    } else {
        res.status(404).end();
    }
});

passRouter.get("/:id", adminAuthMiddleware, async function (req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    let pass = await PassRepository.getPass(Number(id));

    if (pass !== null) {
        res.status(200);
        res.json(pass);
    } else {
        res.status(404).end();
    }
});

passRouter.post("/", adminAuthMiddleware, async function (req, res) {
    const number_of_days_of_validity = req.body.number_of_days_of_validity;
    const number_of_use_per_month = req.body.number_of_use_per_month;
    const is_night_pass = req.body.is_night_pass;

    if (number_of_days_of_validity === undefined || number_of_use_per_month === undefined || is_night_pass === undefined) {
        res.status(401).end();
        return;
    }

    const passController = await PassController.getInstance();
    const pass = await passController.createPass(number_of_days_of_validity, number_of_use_per_month, is_night_pass);

    if (pass !== null) {
        res.status(200);
        res.json(pass);
    } else {
        res.status(404).end();
    }
});

passRouter.put("/", adminAuthMiddleware, async function (req, res) {
    const id = req.body.id;
    const number_of_days_of_validity = req.body.number_of_days_of_validity;
    const number_of_use_per_month = req.body.number_of_use_per_month;

    if (id === undefined) {
        res.status(401).end();
        return;
    }

    const passController = await PassController.getInstance();
    const pass = await passController.updatePass(id, number_of_days_of_validity, number_of_use_per_month);

    if (pass !== null) {
        res.status(200);
        res.json(pass);
    } else {
        res.status(404).end();
    }
});

passRouter.delete("/", adminAuthMiddleware, async function (req, res) {
    const id = req.body.id;

    if (id === undefined) {
        res.status(401).end();
        return;
    }

    const passController = await PassController.getInstance();
    const pass = await passController.deletePass(id);

    if (pass) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

export {
    passRouter
};
