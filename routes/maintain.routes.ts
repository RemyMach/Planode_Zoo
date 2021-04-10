import express from "express";
import { MaintainController } from "../controllers/maintain.controller";
import {adminAuthMiddleware, authMiddleware, superAdminAuthMiddleware} from "../middlewares/auth.middleware";


const maintainRouter = express.Router();

maintainRouter.post("/", adminAuthMiddleware, async function(req, res) {

    const start_date: string = req.body.start_date;
    const end_date: string = req.body.end_date;
    const area_id: number = req.body.area_id;
    const user_id: number = req.body.user_id;

    if(!start_date || !end_date || !area_id || !user_id) {
            res.status(404).end();
    }
    const maintainController = await MaintainController.getInstance();
    const maintain = await maintainController.createAMaintain({
        start_date,
        end_date,
        user_id,
        area_id
    });

    if(maintain === null) {
        res.status(404).end();
    }else {
        res.status(201);
        res.json(maintain).end();
    }
});

maintainRouter.delete("/:id", adminAuthMiddleware, async function(req, res) {

    const maintain_id: number | undefined = req.params.id !== undefined ? Number.parseInt(req.params.id as string) : undefined;
    
    if(maintain_id === undefined) {
            res.status(400).end();
            return;
    }
    const maintainController = await MaintainController.getInstance();
    const maintain = await maintainController.deleteAMaintain(maintain_id);
    
    if(maintain === null) {
        res.status(400).end();
    }else {
        res.status(200).end();
    }
});

export {
    maintainRouter
};