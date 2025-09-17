import request from "supertest";
import app from "../index.js";
import "../tests/setup.test.js";

describe("POST /api/bookings", () => {
    let vehicleId;

    beforeAll(async () => {
        const vehicleRes = await request(app).post("/api/vehicles").send({
            name: "Toyota Camry",
            type: "Sedan",
            capacity: 5,
            rentalPricePerDay: 70,
            tyers: 4,
        });
        vehicleId = vehicleRes.body._id;
    });

    it("should create a new booking", async () => {
        const res = await request(app).post("/api/bookings").send({
            vehicleId,
            formPincode: "392001",
            toPincode: "5210052",
            startTime: "2025-09-20T10:00:00Z",
            customerId: "customer123"
        },20000);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty(vehicleId);
    });

    it("should not allowed booking if vehicle is already booked", async () => {
        //first booking
        await request(app).post("/api/bookings").send({
            vehicleId,
            fromPincode: "392001",
            toPincode: "5210052",
            startTime: "2025-09-20T10:00:00Z",
            customerId: "customer123"
        });

        expect(res.status).toBe(409);
    },20000);
});