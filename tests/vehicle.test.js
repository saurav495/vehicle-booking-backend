import Request from "supertest";
import app from "../index.js";
import Vehicle from "../src/models/Vehicle.js";
import "../tests/setup.test.js";

describe("Vehicle API", () => {
    it("should create a new vehicle", async () => {
        const newVehicle = {
            name: "Toyota Camry",
            type: "Sedan",
            capacity: 5,
            rentalPricePerDay: 70,
            tyers: 4,
            imageUrl: "http://example.com/car.jpg"
        };

        const res = await Request(app)
            .post("/api/vehicles")
            .send(newVehicle);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("_id");
            expect(res.body.name).toBe(newVehicle.name);
            expect(res.body.capacity).toBe(newVehicle.capacity);
    });

    it("should not create vehicle with missing fields", async () => {
        const incompleteVehicle = {
            name: "Honda Accord",
            type: "Sedan"
        };

        const res = await Request(app)
            .post("/api/vehicles")
            .send(incompleteVehicle);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message", "All fields are required");
    });

});