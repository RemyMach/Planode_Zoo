import express from "express";
import {AuthController} from "../controllers/auth.controller";

export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers["authorization"];

    if(auth !== undefined) {
        const token = auth.replace('Bearer ', '');
        const authController = await AuthController.getInstance();
        const session = await authController.getSession(token);
        if(session !== null) {
            next();
            return;
        } else {
            res.status(403).end();
            return;
        }
    } else {
        res.status(401).end();
    }
}

export async function adminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers["authorization"];
    console.log("je suis ici");
    
    if(auth !== undefined) {
        const token = auth.replace('Bearer ', '');
        const authController = await AuthController.getInstance();
        const session = await authController.getSpecificRoleSession(token, ['administrateur', 'super_admin']);
        console.log("session -> " + session);
        
        if(session !== null) {
            next();
            return;
        } else {
            res.status(403).end();
            return;
        }
    } else {
        res.status(401).end();
    }
}

export async function superAdminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers["authorization"];
    
    if(auth !== undefined) {
        const token = auth.replace('Bearer ', '');
        const authController = await AuthController.getInstance();
        const session = await authController.getSpecificRoleSession(token, ['super_admin']);
        if(session !== null) {
            next();
            return;
        } else {
            res.status(403).end();
            return;
        }
    } else {
        res.status(401).end();
    }
}