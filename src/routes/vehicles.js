import express from "express";
import { availableVehicles, createVehicle } from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/", createVehicle);

router.get("/available", availableVehicles);
 
export default router;