import express from "express";
import { SpeciesInstance } from "../models/species.model";
import { SpeciesController } from "../controllers/species.controller";

const speciesRouter = express.Router();

speciesRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const details = req.query.details === "true";

    const speciesController = await SpeciesController.getInstance();
    let species: SpeciesInstance[] = await speciesController.getAll(offset, limit, details);

    if(species !== null) {
        res.status(200);
        res.json(species);
    }else {
        res.status(404).end();
    }
});

speciesRouter.get("/", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const id = req.headers["id"];
    const name = req.headers["name"];

    if (id === undefined && name === undefined) {
        res.status(403).end();
        return;
    }

    const speciesController = await SpeciesController.getInstance();
    let species: SpeciesInstance | null = null;

    if (id !== undefined) {
        species = await speciesController.getSpeciesById(Number(id), details);
    } else if (name !== undefined) {
        species = await speciesController.getSpeciesByName(name.toString(), details);
    }

    if(species !== null) {
        res.status(200);
        res.json(species);
    }else {
        res.status(404).end();
    }
});

speciesRouter.put("/", /*authMiddleware,*/ async function(req, res) {
    const name = req.body.name;

    if(name === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.headers["id"];
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const speciesController = await SpeciesController.getInstance();
    const species = await speciesController.updateSpecies(Number(id),{
        name
    });

    if(species !== null) {
        res.status(200);
        res.json(species);
    }else {
        res.status(404).end();
    }
});

export {
    speciesRouter
};