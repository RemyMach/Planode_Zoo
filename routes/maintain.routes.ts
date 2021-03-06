import express from "express";
import {MaintainController} from "../controllers/maintain.controller";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";
import { MaintainInstance } from "../models/maintain.model";
import { LocationFixture } from "../tests/fixtures/location.fixture";


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
        res.status(400).end();
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
        res.status(200).json({"message": "the maintain has been delete"}).end();
    }
});

maintainRouter.put("/:id", adminAuthMiddleware, async function(req, res) {

    const maintain_id: number | undefined = req.params.id !== undefined ? Number.parseInt(req.params.id as string) : undefined;
    const start_date: string | undefined = req.body.start_date as string;
    const end_date: string | undefined = req.body.end_date as string;
    
    if(maintain_id === undefined || (start_date === undefined &&??end_date === undefined) ) {
            res.status(400).end();
            return;
    }

    const maintainController = await MaintainController.getInstance();
    const maintain: MaintainInstance | null = await maintainController.updateAMaintain(maintain_id, {start_date, end_date});
    
    if(maintain === null) {
        res.status(400).end();
    }else {
        const area = await maintain.getArea();
                
        res.status(200).json({id: maintain.id,start_date:  maintain.start_date,end_date:  maintain.end_date,area_id: area.id,area_name: area.name}).end();
    }
});

maintainRouter.post("/:id", adminAuthMiddleware, async function(req, res) {

    const maintain_id: number | undefined = req.params.id !== undefined ? Number.parseInt(req.params.id as string) : undefined;
    const user_id: number | undefined = req.body.user_id !== undefined ? Number.parseInt(req.body.user_id as string) : undefined;
    
    if(maintain_id === undefined || user_id === undefined ) {
            res.status(400).end();
            return;
    }

    const maintainController = await MaintainController.getInstance();
    const maintain = await maintainController.addAUserToAMaintain(maintain_id, user_id);
    
    if(maintain === null) {
        res.status(400).end();
    }else {
        res.status(200);
        res.json(maintain).end();
    }
});

maintainRouter.get("/:id", adminAuthMiddleware, async function(req, res) {

    const maintain_id: number | undefined = req.params.id !== undefined ? Number.parseInt(req.params.id as string) : undefined;
    
    if(maintain_id === undefined) {
            res.status(400).end();
            return;
    }

    const maintainController = await MaintainController.getInstance();
    const maintain = await maintainController.getMaintainWithUsers(maintain_id);
    
    if(maintain === null) {
        res.status(400).end();
    }else {
        res.status(200);
        res.json(maintain).end();
    }
});

maintainRouter.get("/", adminAuthMiddleware, async function(req, res) {

    const start_date = req.query.start_date as string;

    const maintainController = await MaintainController.getInstance();
    const maintain = await maintainController.getMaintainsSinceADate({start_date});
    
    if(maintain === null) {
        res.status(400).end();
    }else {
        res.status(200);
        res.json(maintain).end();
    }
});

export {
    maintainRouter
};