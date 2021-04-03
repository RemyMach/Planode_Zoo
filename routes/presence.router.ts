import express from "express";
import { PresenceController } from "../controllers/presence.controller";
import { WeekController } from "../controllers/week.controller";
import {adminAuthMiddleware, authMiddleware, superAdminAuthMiddleware} from "../middlewares/auth.middleware";
import { WeekInstance } from "../models/week.model";
import { UserRepository } from "../repositories/user.repository";

const presenceRouter = express.Router();

presenceRouter.put("/prevision/:id", adminAuthMiddleware, async function(req, res) {

    const id_user = req.params.id ? Number.parseInt(req.params.id as string) : undefined;
    
    const date_start = req.body.date_start as string;
    const value = req.body.value ? Boolean(req.body.value) : undefined;
    
    if(id_user === undefined || date_start === undefined || value === undefined) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const presence = await presenceController.updatePrevision(id_user, date_start, {is_programmed: value});
    
    if(presence !== null) {
        res.status(200);
        res.json(presence);
    }else {
        res.status(404).end();
    }
});


export {
    presenceRouter
};