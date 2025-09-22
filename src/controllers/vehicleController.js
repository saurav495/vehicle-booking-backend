import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import { rideDurationHours, addHours } from "../utils/duration.js";

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createVehicle = async (req, res) => {
    try {
        const { name, type, capacity, rentalPricePerDay, tyers, imageUrl } = req.body;

        if (!name || !type || !capacity || !rentalPricePerDay || !tyers ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newVehicle = new Vehicle({
            name,
            type,
            capacity,
            rentalPricePerDay,
            tyers,
            imageUrl
        });

        const savedVehicle = await newVehicle.save();

        res.status(201).json(savedVehicle);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const availableVehicles = async (req, res) => {
    try {
        const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

        const estimatedRideDurationHours = rideDurationHours(fromPincode, toPincode);
        const endTime = addHours(new Date(startTime), estimatedRideDurationHours);

        let availableVehicles = await Vehicle.find({
            capacity: Number(capacityRequired)
        });

        if (availableVehicles.length === 0) {
            availableVehicles = await Vehicle.find({ capacity: { $gt: capacityRequired } })
              .sort({ capacity: 1 }); // ascending, nearest higher first
          }

        const bookings = await Booking.find({
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });

        const bookedVehicleIds = bookings.map(booking => booking.vehicleId.toString());
        const filteredVehicles = availableVehicles.filter(vehicle => !bookedVehicleIds.includes(vehicle._id.toString()));

        res.status(200).json(filteredVehicles);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}