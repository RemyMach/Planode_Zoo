import express from "express";
import {OrderInstance} from "../models/order.model";
import {OrderRepository} from "../repositories/order.repository";
import {OrderController} from "../controllers/order.controller";
import {PassRepository} from "../repositories/pass.repository";
import {AreaController} from "../controllers/area.controller";

const orderRouter = express.Router();

orderRouter.get("/", /*authMiddleware,*/ async function (req, res) {
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;

    const orderController = await OrderController.getInstance();
    const order: OrderInstance[] = await orderController.getAllOrder(offset, limit);

    if (order !== null) {
        res.status(200);
        res.json(order);
    } else {
        res.status(404).end();
    }
});

orderRouter.get("/:id", /*authMiddleware,*/ async function (req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(403).end();
        return;
    }

    let order = await OrderRepository.getOrder(Number(id));

    if (order !== null) {
        res.status(200);
        res.json(order);
    } else {
        res.status(404).end();
    }
});

orderRouter.post("/", /*authMiddleware,*/ async function (req, res) {
    const position = req.body.position;
    const pass_id = req.body.pass_id;
    const area_id = req.body.area_id;

    if (position === undefined) {
        res.status(401).end();
        return;
    }

    const pass = await PassRepository.getPass(pass_id);
    if (pass === null) {
        res.status(400).end();
        return;
    }

    const areaController = await AreaController.getInstance();
    const area = await areaController.getArea(area_id, false);
    if (area === null) {
        res.status(400).end();
        return;
    }

    const orderController = await OrderController.getInstance();
    const order = await orderController.createOrder(position, pass, area);

    if (order !== null) {
        res.status(200);
        res.json(order);
    } else {
        res.status(404).end();
    }
});

orderRouter.put("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;
    const position = req.body.position;

    if (id === undefined || position === undefined) {
        res.status(401).end();
        return;
    }

    const orderController = await OrderController.getInstance();
    const order = await orderController.updateOrder(id, position);

    if (order !== null) {
        res.status(200);
        res.json(order);
    } else {
        res.status(404).end();
    }
});

orderRouter.delete("/", /*authMiddleware,*/ async function (req, res) {
    const id = req.body.id;

    if (id === undefined ) {
        res.status(401).end();
        return;
    }

    const orderController = await OrderController.getInstance();
    const order = await orderController.deleteOrder(id);

    if (order) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

export {
    orderRouter
};
