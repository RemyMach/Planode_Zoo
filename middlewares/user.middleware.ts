import express from "express";
import { UserRepository } from "../repositories/user.repository";

export async function veterinaryMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers["authorization"];
    
    if(auth !== undefined) {
        const token = auth.replace('Bearer ', '');
        
        const user = await UserRepository.getUser(token);
        if(user === null) {
            res.status(401).end();
            return;
        }
        const veterinary = await UserRepository.getUserByIdAndVerifyJob(user.id, ['veterinary']);
        if(veterinary !== null) {
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