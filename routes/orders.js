import express from "express";
import { getOrders, postOrders } from "../controller/orders.js";

const orderRouter = express.Router();
orderRouter.get("/getOrders", getOrders);
orderRouter.post("/postOrders", postOrders);

export default orderRouter;
