import express from "express";
import { getProducts } from "../controller/products.js";

const productRouter = express.Router();

productRouter.get("/getProducts", getProducts);

export default productRouter;
