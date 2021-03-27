import express from "express";
import { ValidationError } from "sequelize/types";
import {AuthController} from "../controllers/auth.controller";
import { BuilderError } from "../errors/builder.error";

const authRouter = express.Router();

authRouter.post("/subscribe", async function(req, res) {
    console.log("je rentre dans la route");
    console.log(req.body);
    
    
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const email = req.body.email;
    
    if(name === undefined || password === undefined || email === undefined || surname === undefined) {
        res.status(400).end();
        return;
    }

    const authController = await AuthController.getInstance();

        /*const user = await authController.subscribe({
            name,
            surname,
            password,
            email
        }).then(() => {
            res.status(201);
            res.json({
                name,
                surname,
                email
            })
        })
        .catch((validationError) => {
            console.log("pomme pomme");
            
            res.status(409);
            res.json(BuilderError.returnApiMessage(validationError.message));
        });*/
        try{
            const user = await authController.subscribe({
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


export {
    authRouter
};