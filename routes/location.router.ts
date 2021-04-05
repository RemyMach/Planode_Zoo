import express from "express";
import {LocationController} from "../controllers/location.controller";
import {LocationInstance} from "../models/location.model";

const locationRouter = express.Router();

locationRouter.get("/all", /*authMiddleware,*/ async function(req, res) {
    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
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

locationRouter.get("/", /*authMiddleware,*/ async function(req, res) {
    const details = req.query.details === "true";
    const id = req.headers["id"];

    if (id === undefined) {
        res.status(403).end();
        return;
    }

    const locationController = await LocationController.getInstance();
    const location = await locationController.getLocationById(Number(id), details);

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

export {
    locationRouter
};