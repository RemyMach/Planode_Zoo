import express from "express";
import { UserController } from "../controllers/user.controller";
import {adminAuthMiddleware, authMiddleware} from "../middlewares/auth.middleware";
import { UserInstance } from "../models/user.model";

const userRouter = express.Router();

userRouter.get("/all", adminAuthMiddleware, async function(req, res) {

    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const userController = await UserController.getInstance();
    const users: UserInstance[] = await userController.getAll(offset, limit);

    if(users !== null) {
        res.status(200);
        res.json(users);
    }else {
        res.status(404).end();
    }
});

userRouter.get("/", authMiddleware, async function(req, res) {

    const auth = req.headers["authorization"];
    if(auth === undefined) {
        res.status(403).end();
        return;
    }
    const token = auth.replace('Bearer ', '');
    const userController = await UserController.getInstance();
    const user: UserInstance | null = await userController.getUser(token);

    if(user !== null) {
        res.status(200);
        res.json(user);
    }else {
        res.status(404).end();
    }
});

export {
    userRouter
};