import express from "express";
import {UserController} from "../controllers/user.controller";
import {adminAuthMiddleware, authMiddleware} from "../middlewares/auth.middleware";
import {UserInstance} from "../models/user.model";

const userRouter = express.Router();

userRouter.get("/all", adminAuthMiddleware, async function(req, res) {

    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const userController = await UserController.getInstance();
    const users: UserInstance[] = await userController.getAll(offset, limit);

    if(users !== null) {
        res.status(200);
        res.json(users).end();
    }else {
        res.status(400).end();
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
        res.json(user).end();
    }else {
        res.status(400).end();
    }
});

userRouter.put("/", authMiddleware, async function(req, res) {

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;

    if(name === undefined && surname === undefined && email === undefined) {
        res.status(400).end();
        return;
    }

    const auth = req.headers["authorization"];
    if(auth === undefined) {
        res.status(403).end();
        return;
    }

    const token = auth.replace('Bearer ', '');
    const userController = await UserController.getInstance();
    const user = await userController.updateUser(token,{
        name,
        surname,
        email
    });

    if(user !== null) {
        res.status(200);
        res.json(user).end();
    }else {
        res.status(400).end();
    }
});


userRouter.put("/password", authMiddleware, async function(req, res) {

    const password = req.body.password;
    const new_password = req.body.new_password;
    const new_password_confirm = req.body.new_password_confirm;

    if(password === undefined || new_password === undefined || new_password_confirm === undefined) {
        res.status(400).end();
        return;
    }

    const auth = req.headers["authorization"];
    if(auth === undefined) {
        res.status(403).end();
        return;
    }

    const token = auth.replace('Bearer ', '');
    const userController = await UserController.getInstance();
    const user = await userController.updatePassword(token,{
        password,
        new_password,
        new_password_confirm
    });
    
    if(user !== null) {
        res.status(200);
        res.json(user).end();
    }else {
        res.status(400).end();
    }
});

userRouter.delete("/", authMiddleware, async function(req, res) {

    const password = req.body.password;

    if(password === undefined) {
        res.status(400).end();
        return;
    }

    const auth = req.headers["authorization"];
    if(auth === undefined) {
        res.status(403).end();
        return;
    }

    const token = auth.replace('Bearer ', '');
    const userController = await UserController.getInstance();
    try {
        const user = await userController.deleteUser(token, password);
        if(user !== null) {
            res.status(200).json({"message": "the user has been deleted"}).end();
        }else {
            res.status(400).end();
        }
    }catch {
        res.status(400).end();
        return;
    }
    
});

export {
    userRouter
};