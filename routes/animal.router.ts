import express from "express";
import { AnimalController } from "../controllers/animal.controller";
import { AnimalInstance } from "../models/animal.model";

const animalRouter = express.Router();

animalRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const animalController = await AnimalController.getInstance();
    const animals: AnimalInstance[] = await animalController.getAll(offset, limit);

    if(animals !== null) {
        res.status(200);
        res.json(animals);
    }else {
        res.status(404).end();
    }
});

animalRouter.get("/", /*authMiddleware,*/ async function(req, res) {
    const id = req.headers["id"];
    const name = req.headers["name"];
    if (id === undefined && name === undefined) {
        res.status(403).end();
        return;
    }

    const animalController = await AnimalController.getInstance();
    let animal: AnimalInstance | null = null;

    if (id !== undefined) {
        animal = await animalController.getAnimalById(Number(id));
    } else if (name !== undefined) {
        animal = await animalController.getAnimalByName(name.toString());
    }

    if(animal !== null) {
        res.status(200);
        res.json(animal);
    }else {
        res.status(404).end();
    }
});

animalRouter.put("/", /*authMiddleware,*/ async function(req, res) {
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    const weight = req.body.weight;
    const height = req.body.height;

    if(name === undefined && birthdate === undefined && weight === undefined && height === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.headers["id"];
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

export {
    animalRouter
};