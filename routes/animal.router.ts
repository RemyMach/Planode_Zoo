import express from "express";
import {AnimalController} from "../controllers/animal.controller";
import {AnimalInstance} from "../models/animal.model";
import {RaceController} from "../controllers/race.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const animalRouter = express.Router();

animalRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const details = req.query.details === "true";

    const animalController = await AnimalController.getInstance();
    const animals: AnimalInstance[] = await animalController.getAll(offset, limit, details);

    if(animals !== null) {
        res.status(200);
        res.json(animals);
    }else {
        res.status(404).end();
    }
});

animalRouter.get("/:scrap", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const scrap = req.params.scrap;

    if (scrap === undefined) {
        res.status(403).end();
        return;
    }

    const id: number | undefined = isNaN(Number(scrap)) ? undefined : Number(scrap);
    const name: string | undefined = scrap;

    const animalController = await AnimalController.getInstance();
    let animal: AnimalInstance | null = null;

    if (id !== undefined) {
        animal = await animalController.getAnimalById(id, details);
    } else if (name !== undefined) {
        animal = await animalController.getAnimalByName(name.toString(), details);
    }

    if(animal !== null) {
        res.status(200);
        res.json(animal);
    }else {
        res.status(404).end();
    }
});

animalRouter.put("/:id", authMiddleware, async function(req, res) {
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    const weight = req.body.weight;
    const height = req.body.height;

    if(name === undefined && birthdate === undefined && weight === undefined && height === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.updateAnimal(Number(id),{
        name,
        birthdate,
        weight,
        height
    });

    if(animal !== null) {
        res.status(200);
        res.json(animal);
    }else {
        res.status(404).end();
    }
});

animalRouter.post("/", authMiddleware, async function(req, res) {
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    const height = req.body.height;
    const weight = req.body.weight;
    const raceId = req.body.race_id;

    if (name === undefined || birthdate === undefined || height === undefined || weight === undefined || raceId === undefined) {
        res.status(400).end();
        return;
    }

    const raceController = await RaceController.getInstance();
    const race = await raceController.getRaceById(raceId, false);

    if (race === null) {
        res.status(400).end();
        return;
    }

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.createAnimal({
        name,
        birthdate,
        height,
        weight
    });

    if (animal !== null) {
        await animal.setRace(raceId);
        res.status(200);
        res.json(animal);
    } else {
        res.status(500).end();
    }
});

animalRouter.delete("/:id", authMiddleware, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
        return;
    }

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.getAnimalById(Number(id), false);

    if (animal === null) {
        res.status(404).end();
        return;
    }

    const isAnimalDeleted = await animalController.deleteAnimal(Number(id));

    if (isAnimalDeleted) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

export {
    animalRouter
};