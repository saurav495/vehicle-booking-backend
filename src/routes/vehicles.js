import express from "express";
import { availableVehicles, createVehicle, getAllVehicles } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", getAllVehicles);

router.post("/", createVehicle);

router.get("/available", availableVehicles);
 
export default router;