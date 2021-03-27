import express from "express";
import {AuthController} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/subscribe", async function(req, res) {
    console.log("je rentre dans la route");
    console.log(req.body);
    
    
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const email = req.body.email;
    console.log(name);
    console.log(surname);
    console.log(password);
    console.log(email);
    
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
        res.json({
            name,
            surname,
            email
        });
    } else {
        res.status(409).end();
    }
});


export {
    authRouter
};