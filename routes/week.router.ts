import express from "express";
import { WeekController } from "../controllers/week.controller";
import {adminAuthMiddleware, authMiddleware, superAdminAuthMiddleware} from "../middlewares/auth.middleware";
import { WeekInstance } from "../models/week.model";

const weekRouter = express.Router();

weekRouter.post("/", superAdminAuthMiddleware, async function(req, res) {


    const weekController = await WeekController.getInstance();
    const week: void | null = await weekController.addAYearSinceTheLastWeekinTheDB();

    if(week !== null) {
        res.status(201);
        res.json({"message": "The year has been created"});
    }else {
        res.status(404).end();
    }
});

weekRouter.get("/last", superAdminAuthMiddleware, async function(req, res) {

    const weekController = await WeekController.getInstance();
    const week: string | null = await weekController.getTheLastWeekInTheDB();

    if(week !== null) {
        res.status(201);
        res.json({week});
    }else {
        res.status(404).end();
    }
});


export {
    weekRouter
};