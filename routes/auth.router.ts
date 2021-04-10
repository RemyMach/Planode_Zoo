import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {BuilderError} from "../errors/builder.error";
import {authMiddleware} from "../middlewares/auth.middleware";


const authRouter = express.Router();

authRouter.post("/subscribe", async function(req, res) {
    
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const email = req.body.email;
    
    if(name === undefined || password === undefined || email === undefined || surname === undefined) {
        res.status(400).end();
        return;
    }

    const authController = await AuthController.getInstance();
        try{
            await authController.subscribe({
                name,
                surname,
                password,
                email
            });
            res.status(201);
            res.json({
                name,
                surname,
                email
            });
        
        }catch(validationError){
            res.status(409);
            res.json(BuilderError.returnApiMessage(validationError.message));
        }
});

authRouter.post("/login", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if(email === undefined || password === undefined) {
        res.status(400).end();
        return;
    }
    const authController = await AuthController.getInstance();
    try{
        const session = await authController.log(email, password);
        console.log(session);
        
        if(session === null) {
            res.status(404).end();
            return;
        } else {
            res.json({
                token: session.token
            });
        }
        
    }catch(validationError){
        res.status(404);
        res.json(BuilderError.returnApiMessage(validationError.message));
        return;
    }
});

authRouter.delete("/logout", authMiddleware, async function(req, res) {
    const auth = req.headers["authorization"];
    if(auth === undefined) {
        res.status(403).end();
        return;
    }

    const token = auth.replace('Bearer ', '');
    const authController = await AuthController.getInstance();

    try{
        const session = await authController.deleteSession(token);
        console.log(session);
        
        if(session === null) {
            res.status(404).end();
            return;
        } else {
            res.status(200).end();
        }
        
    }catch(validationError){
        res.status(404);
        res.json(BuilderError.returnApiMessage(validationError.message));
        return;
    }
    
});

export {
    authRouter
};