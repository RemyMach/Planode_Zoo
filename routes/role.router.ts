import express from "express";
import {RoleController} from "../controllers/role.controller";
import {adminAuthMiddleware, superAdminAuthMiddleware} from "../middlewares/auth.middleware";
import {RoleInstance} from "../models/role.model";

const roleRouter = express.Router();

roleRouter.get("/all", adminAuthMiddleware, async function(req, res) {

    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
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

roleRouter.get("/user", adminAuthMiddleware, async function(req, res) {

    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const roleController = await RoleController.getInstance();
    const jobs: RoleInstance[] = await roleController.getAllRolesWithUsers(offset, limit);

    if(jobs !== null) {
        res.status(200);
        res.json(jobs);
    }else {
        res.status(404).end();
    }

});

roleRouter.post("/", superAdminAuthMiddleware, async function(req, res) {

    const label_role = req.body.role;

    if(label_role === undefined) {
        res.status(404).end();
    }

    const roleController = await RoleController.getInstance();
    const role: RoleInstance | null = await roleController.createRole(label_role);

    if(role !== null) {
        res.status(201);
        res.json(role);
    }else {
        res.status(404).end();
    }
});

roleRouter.put("/:id", superAdminAuthMiddleware, async function(req, res) {

    const label = req.body.new_label;
    const id_role = req.params.id !== undefined ? Number.parseInt(req.params.id): undefined;
    if(label === undefined || id_role === undefined) {
        res.status(400).end();
        return;
    }

    const roleController = await RoleController.getInstance();
    const role: RoleInstance | null = await roleController.updateRole(id_role, {
        label
    });

    if(role !== null) {
        res.status(200);
        res.json(role);
    }else {
        res.status(404).end();
    }
});

roleRouter.delete("/:id", superAdminAuthMiddleware, async function(req, res) {

    const id_role = req.params.id !== undefined ? Number.parseInt(req.params.id): undefined;
    if(id_role === undefined) {
        res.status(400).end();
        return;
    }

    const roleController = await RoleController.getInstance();
    const job: void | null = await roleController.deleteRole(id_role);

    if(job !== null) {
        res.status(200);
        res.json(job);
    }else {
        res.status(404).end();
    }
});

export {
    roleRouter
};