import express from "express";
import {PresenceController} from "../controllers/presence.controller";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";

const presenceRouter = express.Router();

presenceRouter.get("/prevision/:id", adminAuthMiddleware, async function(req, res) {

    const id_user = req.params.id ? Number.parseInt(req.params.id as string) : undefined;
    
    if(id_user === undefined ) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const presence = await presenceController.getPresenceForAUser(id_user, {is_programmed: true});
    
    if(presence !== null) {
        res.status(200);
        res.json(presence);
    }else {
        res.status(400).end();
    }
});

presenceRouter.get("/work/:id", adminAuthMiddleware, async function(req, res) {

    const id_user = req.params.id ? Number.parseInt(req.params.id as string) : undefined;
    
    if(id_user === undefined ) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const presence = await presenceController.getPresenceForAUser(id_user, {is_worked: true});
    
    if(presence !== null) {
        res.status(200);
        res.json(presence);
    }else {
        res.status(400).end();
    }
});

presenceRouter.get("/unavailable/:id", adminAuthMiddleware, async function(req, res) {

    const id_user = req.params.id ? Number.parseInt(req.params.id as string) : undefined;
    
    if(id_user === undefined ) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const presence = await presenceController.getPresenceForAUser(id_user, {is_available: false});
    
    if(presence !== null) {
        res.status(200);
        res.json(presence);
    }else {
        res.status(400).end();
    }
});

presenceRouter.get("/available", adminAuthMiddleware, async function(req, res) {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    if(start_date === undefined || end_date === undefined) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const users = await presenceController.getAvailableUsersForAPeriod( start_date as string, end_date as string, {is_available: true});
    
    if(users !== null) {
        res.status(200);
        res.json(users);
    }else {
        res.status(400).end();
    }
});

presenceRouter.get("/available/:job", adminAuthMiddleware, async function(req, res) {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const job = req.params.job;

    if(start_date === undefined || end_date === undefined || job === undefined) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const users = await presenceController.getAvailableUsersForAPeriodWithASpecificWork(job, start_date as string, end_date as string, {is_available: true});
    
    if(users !== null) {
        res.status(200);
        res.json(users);
    }else {
        res.status(400).end();
    }
});

presenceRouter.get("/prevision", adminAuthMiddleware, async function(req, res) {
    
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    if(start_date === undefined || end_date === undefined) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const users = await presenceController.getUsersProgrammedForAPeriod(start_date as string, end_date as string, {is_programmed: true, is_available: true});
    
    if(users !== null) {
        const zooCanOpenForThePeriod = await presenceController.zooCanOpenWithThisUsers(users);
        const message = zooCanOpenForThePeriod === false ? "zoo can't open for this Period": "zoo can open for this period";
        
        res.status(200);
        res.json({users, message});
    }else {
        res.status(400).end();
    }
});

presenceRouter.put("/prevision/:id", adminAuthMiddleware, async function(req, res) {

    const id_user = req.params.id ? Number.parseInt(req.params.id as string) : undefined;
    
    const date_start = req.body.date_start as string;
    const value = req.body.value ? Boolean(Number.parseInt(req.body.value as string)) : undefined;
    
    if(id_user === undefined || date_start === undefined || value === undefined) {
        res.status(400).end();
        return;
    }
    
    const presenceController = await PresenceController.getInstance();
    const presence = await presenceController.updatePresenceUpdateOption(id_user, date_start, {is_programmed: value});
    console.log("presence -> " + presence);
    
    if(presence !== null) {
        res.status(200);
        res.json(presence);
    }else {
        res.status(400).end();
    }
});

presenceRouter.put("/work/:id", adminAuthMiddleware, async function(req, res) {

    const id_user = req.params.id ? Number.parseInt(req.params.id as string) : undefined;
    
    const date_start = req.body.date_start as string;
    const value = req.body.value ? Boolean(Number.parseInt(req.body.value as string)) : undefined;
    
    if(id_user === undefined || date_start === undefined || value === undefined) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const presence = await presenceController.updatePresenceUpdateOption(id_user, date_start, {is_worked: value});
    
    if(presence !== null) {
        res.status(200);
        res.json(presence);
    }else {
        res.status(400).end();
    }
});

presenceRouter.put("/available/:id", adminAuthMiddleware, async function(req, res) {

    const id_user = req.params.id ? Number.parseInt(req.params.id as string) : undefined;
    
    const date_start = req.body.date_start as string;
    const value = req.body.value ? Boolean(Number.parseInt(req.body.value as string)) : undefined;
    
    if(id_user === undefined || date_start === undefined || value === undefined) {
        res.status(400).end();
        return;
    }

    const presenceController = await PresenceController.getInstance();
    const presence = await presenceController.updatePresenceUpdateOption(id_user, date_start, {is_available: value});
    
    if(presence !== null) {
        res.status(200);
        res.json(presence);
    }else {
        res.status(400).end();
    }
});


export {
    presenceRouter
};