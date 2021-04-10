import express from "express";
import {LocationController} from "../controllers/location.controller";
import {LocationInstance} from "../models/location.model";
import {AreaController} from "../controllers/area.controller";
import {AnimalController} from "../controllers/animal.controller";

const locationRouter = express.Router();

locationRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const details = req.query.details === "true";

    const locationController = await LocationController.getInstance();
    let locations: LocationInstance[] = await locationController.getAll(offset, limit, details);

    if(locations !== null) {
        res.status(200);
        res.json(locations);
    }else {
        res.status(404).end();
    }
});

locationRouter.get("/:id", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const id = Number(req.params.id);

    if (id === undefined || isNaN(id)) {
        res.status(403).end();
        return;
    }

    const locationController = await LocationController.getInstance();
    const location = await locationController.getLocationById(id, details);

    if(location !== null) {
        res.status(200);
        res.json(location);
    }else {
        res.status(404).end();
    }
});

locationRouter.put("/", /*authMiddleware,*/ async function(req, res) {
    const entry_date = req.body.entry_date;
    const exit_date = req.body.exit_date;

    if(entry_date === undefined && exit_date === undefined) {
        res.status(400).end();
        return;
    }

    const id = req.headers["id"];
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const locationController = await LocationController.getInstance();
    const location = await locationController.updateLocation(Number(id),{
        entry_date,
        exit_date
    });

    if(location !== null) {
        res.status(200);
        res.json(location);
    }else {
        res.status(404).end();
    }
});

locationRouter.post("/", /*authMiddleware,*/ async function(req, res) {
    const entryDate = req.body.entry_date;
    const exitDate = req.body.exit_date || null;
    const areaId = req.body.area_id;
    const animalId = req.body.animal_id || null;

    if (entryDate === undefined || areaId === undefined) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.getArea(areaId, false);
    if (area === null) {
        res.status(404).end();
        return;
    }

    if (animalId !== null) {
        const animalController = await AnimalController.getInstance();
        const animal = await animalController.getAnimalById(animalId, false);
        if (animal === null) {
            res.status(404).end();
            return;
        }
    }

    const locationController = await LocationController.getInstance();
    const location = await locationController.createLocation({
        entry_date: entryDate,
        exit_date: exitDate
    });

    if (location !== null) {
        await location.setArea(areaId);
        if (animalId !== null) {
            await location.setAnimal(animalId);
        }
        res.status(200);
        res.json(location);
    } else {
        res.status(500).end();
    }
});

locationRouter.delete("/", /*authMiddleware,*/ async function(req, res) {
    const id = req.headers["id"];
    if (id === undefined) {
        res.status(400).end();
        return;
    }

    const locationController = await LocationController.getInstance();
    const location = await locationController.getLocationById(Number(id), false);

    if (location === null) {
        res.status(404).end();
        return;
    }

    const isLocationDeleted = await locationController.deleteLocation(Number(id));

    if (isLocationDeleted) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

export {
    locationRouter
};