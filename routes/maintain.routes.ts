import express from "express";
import {adminAuthMiddleware, authMiddleware, superAdminAuthMiddleware} from "../middlewares/auth.middleware";


const maintainRouter = express.Router();

maintainRouter.post("/", adminAuthMiddleware, async function(req, res) {

    

});


export {
    maintainRouter
};