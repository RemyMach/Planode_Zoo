import express from "express";
import { AdminController } from "../controllers/admin.controller";
import {UserController} from "../controllers/user.controller";
import {adminAuthMiddleware, authMiddleware} from "../middlewares/auth.middleware";
import {UserInstance} from "../models/user.model";

const adminRouter = express.Router();

adminRouter.put("/user/:idUser", adminAuthMiddleware, async function(req, res) {

    const role_id = req.body.role_id ? Number.parseInt(req.body.role_id as string) : undefined;
    const job_id = req.body.job_id ? Number.parseInt(req.body.job_id as string) : undefined;
    const id = req.params.idUser ? Number.parseInt(req.params.idUser  as string) : undefined;

    if(id === undefined) {
        res.status(400).end();
        return;
    }

    const adminController = await AdminController.getInstance();
    const user = await adminController.updateUserJobRole({id, role_id, job_id});

    if(user !== null) {
        res.status(200);
        res.json(user).end();
    }else {
        res.status(400).end();
    }
});

adminRouter.post("/user", adminAuthMiddleware, async function(req, res) {

    const role_id = req.body.role_id ? Number.parseInt(req.body.role_id as string) : undefined;
    const job_id = req.body.job_id ? Number.parseInt(req.body.job_id as string) : undefined;
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const email = req.body.email;

    if(name === undefined || password === undefined || email === undefined || surname === undefined) {
        res.status(400).end();
        return;
    }

    const adminController = await AdminController.getInstance();
    const user = await adminController.createUser({name, surname, password, email}, {role_id, job_id});

    if(user !== null) {
        res.status(200);
        res.json(user).end();
    }else {
        res.status(400).end();
    }
});


export {
    adminRouter
};