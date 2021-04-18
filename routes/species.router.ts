import express from "express";
import {SpeciesInstance} from "../models/species.model";
import {SpeciesController} from "../controllers/species.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const speciesRouter = express.Router();

speciesRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
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

speciesRouter.get("/:scrap", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const scrap = req.params.scrap;

    if (scrap === undefined) {
        res.status(403).end();
        return;
    }

    const id: number | undefined = isNaN(Number(scrap)) ? undefined : Number(scrap);
    const name: string | undefined = scrap;

    const speciesController = await SpeciesController.getInstance();
    let species: SpeciesInstance | null = null;

    if (id !== undefined) {
        species = await speciesController.getSpeciesById(id, details);
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

speciesRouter.put("/:id", authMiddleware, async function(req, res) {
    const name = req.body.name;

    if(name === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.params.id;
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

speciesRouter.post("/", authMiddleware, async function(req, res) {
    const name = req.body.name;

    if (name === undefined) {
        res.status(400).end();
        return;
    }

    const speciesController = await SpeciesController.getInstance();
    const species = await speciesController.createSpecies({
        name
    });

    if (species !== null) {
        res.status(200);
        res.json(species);
    } else {
        res.status(500).end();
    }
});

speciesRouter.delete("/:id", authMiddleware, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
        return;
    }

    const speciesController = await SpeciesController.getInstance();
    const species = await speciesController.getSpeciesById(Number(id), false);

    if (species === null) {
        res.status(404).end();
        return;
    }

    const isSpeciesDeleted = await speciesController.deleteSpecies(Number(id));

    if (isSpeciesDeleted) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

export {
    speciesRouter
};