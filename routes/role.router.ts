import express from "express";
import { RoleController } from "../controllers/role.controller";
import { UserController } from "../controllers/user.controller";
import {adminAuthMiddleware, authMiddleware, superAdminAuthMiddleware} from "../middlewares/auth.middleware";
import { RoleInstance } from "../models/role.model";
import { UserInstance } from "../models/user.model";

const roleRouter = express.Router();

roleRouter.get("/all", superAdminAuthMiddleware, async function(req, res) {

    const offset = req.query.limit ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const roleController = await RoleController.getInstance();
    const roles: RoleInstance[] = await roleController.getAll(offset, limit);

    if(roles !== null) {
        res.status(200);
        res.json(roles);
    }else {
        res.status(404).end();
    }
});

export {
    roleRouter
};