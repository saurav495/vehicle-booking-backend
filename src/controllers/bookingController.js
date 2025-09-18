import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import { rideDurationHours, addHours } from "../utils/duration.js";

export const createBooking = async (req, res) => {
    const { vehicleId, fromPincode, toPincode, startTime, customerName } = req.body;

    try {
        // Validate vehicle existence
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        // Calculate estimated ride duration hours based on pincodes
        const estimatedRideDurationHours = rideDurationHours(fromPincode, toPincode);
        const bookingEndTime = addHours(new Date(startTime), estimatedRideDurationHours);
        // Check for conflicting bookings
        const conflictingBooking = await Booking.findOne({
            vehicleId,
            $or: [
                { startTime: { $lt: bookingEndTime }, bookingEndTime: { $gt: new Date(startTime) } }
            ]
        });
        if (conflictingBooking) {
            return res.status(409).json({ message: "Vehicle is already booked for the selected time." });
        }
        // Create a new booking
        const newBooking = new Booking({
            vehicleId,
            fromPincode,
            toPincode,
            startTime: new Date(startTime),
            endTime: bookingEndTime,
            customerName
        });
        await newBooking.save();
        return res.status(201).json(newBooking);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}