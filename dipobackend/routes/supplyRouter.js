import express from "express";
import { getSupplies } from "../controllers/supply.js";

const supplyRouter = express.Router();

supplyRouter.get('/:library/:type', getSupplies);
  
  export default supplyRouter;