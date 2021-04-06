import express from "express";
import {HealthcareController} from "../controllers/healthcare.controller";
import {HealthcareInstance} from "../models/healthcare.model";

const healthcareRouter = express.Router();

healthcareRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const details = req.query.details === "true";

    const healthcareController = await HealthcareController.getInstance();
    let healthcare: HealthcareInstance[] = await healthcareController.getAll(offset, limit, details);

    if(healthcare !== null) {
        res.status(200);
        res.json(healthcare);
    }else {
        res.status(404).end();
    }
});

healthcareRouter.get("/", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const id = req.headers["id"];

    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const healthcareController = await HealthcareController.getInstance();
    let healthcare = await healthcareController.getHealthcareById(Number(id), details);

    if(healthcare !== null) {
        res.status(200);
        res.json(healthcare);
    }else {
        res.status(404).end();
    }
});

healthcareRouter.put("/", /*authMiddleware,*/ async function(req, res) {
    const date = new Date(Number(req.body.date));
    const name = req.body.name;
    const notes = req.body.notes;
    const cost = Number(req.body.cost);
    const success = req.body.success === "true";

    if(date === undefined && name === undefined && notes === undefined && cost === undefined && success === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.headers["id"];
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const healthcareController = await HealthcareController.getInstance();
    const healthcare = await healthcareController.updateHealthcare(Number(id),{
        date,
        name,
        notes,
        cost,
        success
    });

    if(healthcare !== null) {
        res.status(200);
        res.json(healthcare);
    }else {
        res.status(404).end();
    }
});

export {
    healthcareRouter
};