import express from "express";
import { RaceInstance } from "../models/race.model";
import { RaceController } from "../controllers/race.controller";

const raceRouter = express.Router();

raceRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const details = req.query.details === "true";

    const raceController = await RaceController.getInstance();
    let races: RaceInstance[] = await raceController.getAll(offset, limit, details);

    if(races !== null) {
        res.status(200);
        res.json(races);
    }else {
        res.status(404).end();
    }
});

raceRouter.get("/", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const id = req.headers["id"];
    const breed = req.headers["breed"];

    if (id === undefined && breed === undefined) {
        res.status(403).end();
        return;
    }

    const raceController = await RaceController.getInstance();
    let race: RaceInstance | null = null;

    if (id !== undefined) {
        race = await raceController.getRaceById(Number(id), details);
    } else if (breed !== undefined) {
        race = await raceController.getRaceByBreed(breed.toString(), details);
    }

    if(race !== null) {
        res.status(200);
        res.json(race);
    }else {
        res.status(404).end();
    }
});

raceRouter.put("/", /*authMiddleware,*/ async function(req, res) {
    const breed = req.body.breed;

    if(breed === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.headers["id"];
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const raceController = await RaceController.getInstance();
    const race = await raceController.updateRace(Number(id),{
        breed
    });

    if(race !== null) {
        res.status(200);
        res.json(race);
    }else {
        res.status(404).end();
    }
});

export {
    raceRouter
};