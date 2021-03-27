import express from "express";
import {AuthController} from "../controllers/auth.controller";

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
    const user = await authController.subscribe({
        name,
        surname,
        password,
        email
    });

    if(user !== null) {
        res.status(201);
        res.json(user);
    } else {
        res.status(409).end();
    }
});


export {
    authRouter
};