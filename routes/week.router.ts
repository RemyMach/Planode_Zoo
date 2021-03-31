import express from "express";
import { WeekController } from "../controllers/week.controller";
import {adminAuthMiddleware, authMiddleware, superAdminAuthMiddleware} from "../middlewares/auth.middleware";
import { WeekInstance } from "../models/week.model";

const weekRouter = express.Router();

weekRouter.post("/", adminAuthMiddleware, async function(req, res) {


    const weekController = await WeekController.getInstance();
    const week: WeekInstance | null = await weekController.addAYearSinceTheLastWeekinTheDB();

    if(week !== null) {
        res.status(201);
        res.json(week);
    }else {
        res.status(404).end();
    }
});



export {
    weekRouter
};