import express from "express";
import {HealthcareController} from "../controllers/healthcare.controller";
import {HealthcareInstance} from "../models/healthcare.model";
import {AnimalController} from "../controllers/animal.controller";

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

healthcareRouter.get("/:id", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const id = Number(req.params.id);

    if (id === undefined || isNaN(id)) {
        res.status(403).end();
        return;
    }

    const healthcareController = await HealthcareController.getInstance();
    let healthcare = await healthcareController.getHealthcareById(id, details);

    if(healthcare !== null) {
        res.status(200);
        res.json(healthcare);
    }else {
        res.status(404).end();
    }
});

healthcareRouter.put("/:id", /*authMiddleware,*/ async function(req, res) {
    const date = new Date(Number(req.body.date));
    const name = req.body.name;
    const notes = req.body.notes;
    const cost = Number(req.body.cost);
    const success = req.body.success === "true";

    if(date === undefined && name === undefined && notes === undefined && cost === undefined && success === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.params.id;
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

healthcareRouter.post("/", /*authMiddleware,*/ async function(req, res) {
    const date = req.body.date;
    const name = req.body.name;
    const notes = req.body.notes;
    const cost = req.body.cost;
    const success = req.body.success;
    const animalId = req.body.animal_id;

    if (date === undefined || name === undefined || notes === undefined || cost === undefined || success === undefined || animalId === undefined) {
        res.status(400).end();
        return;
    }

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.getAnimalById(animalId, false);

    if (animal === null) {
        res.status(400).end();
        return;
    }

    const healthcareController = await HealthcareController.getInstance();
    const healthcare = await healthcareController.createHealthcare({
        date,
        name,
        notes,
        cost,
        success
    });

    if (healthcare !== null) {
        await animal.addHealthcare(healthcare);
        res.status(200);
        res.json(healthcare);
    } else {
        res.status(500).end();
    }
});

healthcareRouter.delete("/:id", /*authMiddleware,*/ async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
        return;
    }

    const healthcareController = await HealthcareController.getInstance();
    const healthcare = await healthcareController.getHealthcareById(Number(id), false);

    if (healthcare === null) {
        res.status(404).end();
        return;
    }

    const isHealthcareDeleted = await healthcareController.deleteHealthcare(Number(id));

    if (isHealthcareDeleted) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

export {
    healthcareRouter
};